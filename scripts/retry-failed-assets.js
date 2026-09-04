const fs = require("fs");
const https = require("https");
const path = require("path");
const sharp = require("sharp");
const { execSync } = require("child_process");

function dl(url) {
	return new Promise((res, rej) => {
		https
			.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (r) => {
				if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
					return dl(r.headers.location).then(res, rej);
				}
				if (r.statusCode !== 200) {
					r.resume();
					return rej(new Error(String(r.statusCode)));
				}
				const c = [];
				r.on("data", (d) => c.push(d));
				r.on("end", () => res(Buffer.concat(c)));
			})
			.on("error", rej);
	});
}

const jobs = [
	[
		"data-center",
		"server-software-and-licensing",
		"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
	],
	[
		"data-center",
		"enterprise-networks",
		"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
	],
	[
		"data-center",
		"structured-cabling",
		"https://images.unsplash.com/photo-1517420704952-d7f1f4bc86ea?auto=format&fit=crop&w=1200&q=80",
	],
	[
		"data-center",
		"datacenter-cooling",
		"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
	],
	["brands", "epson", "https://logo.clearbit.com/epson.com?size=128"],
	["brands", "honeywell", "https://logo.clearbit.com/honeywell.com?size=128"],
	["brands", "uniview", "https://logo.clearbit.com/uniview.com?size=128"],
	["brands", "netapp", "https://logo.clearbit.com/netapp.com?size=128"],
	["brands", "legrand", "https://logo.clearbit.com/legrand.com?size=128"],
];

(async () => {
	for (const [folder, name, url] of jobs) {
		const dest = path.join("public/images", folder, name + ".webp");
		fs.mkdirSync(path.dirname(dest), { recursive: true });
		if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) {
			console.log("skip", folder, name);
			continue;
		}
		try {
			const buf = await dl(url);
			if (folder === "brands") {
				await sharp(buf)
					.resize(160, 80, {
						fit: "contain",
						background: { r: 255, g: 255, b: 255, alpha: 0 },
					})
					.webp({ quality: 90 })
					.toFile(dest);
			} else {
				await sharp(buf)
					.resize(960, 540, { fit: "cover", position: "attention" })
					.webp({ quality: 82 })
					.toFile(dest);
			}
			console.log("ok", folder, name, fs.statSync(dest).size);
		} catch (e) {
			console.log("fail", name, e.message);
		}
	}
	execSync("node scripts/enrich-category-data.js", { stdio: "inherit" });
})();
