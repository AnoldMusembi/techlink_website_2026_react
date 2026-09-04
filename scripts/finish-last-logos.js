const fs = require("fs");
const https = require("https");
const path = require("path");
const sharp = require("sharp");
const { execSync } = require("child_process");

function dl(url) {
	return new Promise((res, rej) => {
		const req = https.get(
			url,
			{ headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*" }, timeout: 20000 },
			(r) => {
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
			}
		);
		req.on("error", rej);
		req.on("timeout", () => {
			req.destroy();
			rej(new Error("timeout"));
		});
	});
}

const brands = [
	["uniview", "UNIVIEW"],
	["asenware", "ASENWARE"],
];

(async () => {
	for (const [key, label] of brands) {
		const dest = path.join("public/images/brands", key + ".webp");
		const tries = [
			`https://www.google.com/s2/favicons?domain=${key}.com&sz=128`,
			`https://icons.duckduckgo.com/ip3/${key}.com.ico`,
		];
		let done = false;
		for (const url of tries) {
			try {
				const buf = await dl(url);
				if (buf && buf.length > 100) {
					await sharp(buf)
						.ensureAlpha()
						.resize(180, 90, {
							fit: "contain",
							background: { r: 255, g: 255, b: 255, alpha: 0 },
						})
						.webp({ quality: 92 })
						.toFile(dest);
					if (fs.statSync(dest).size > 150) {
						console.log("dl", key);
						done = true;
						break;
					}
				}
			} catch {
				// next
			}
		}
		if (!done) {
			const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="120"><rect width="360" height="120" rx="12" fill="#ffffff"/><text x="180" y="70" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="700" fill="#222222">${label}</text></svg>`;
			await sharp(Buffer.from(svg)).webp({ quality: 95 }).toFile(dest);
			console.log("wordmark", key);
		}
	}

	execSync("node scripts/enrich-category-data.js", { stdio: "inherit" });

	const ictPath = "public/fakedata/home-work.json";
	const ict = JSON.parse(fs.readFileSync(ictPath, "utf8"));
	const av = ict.find((g) => g.slug === "audio-visual-and-collaboration-systems");
	if (av) {
		av.brands = [
			{ name: "Logitech", logo: "/images/brands/logitech.webp" },
			{ name: "Samsung", logo: "/images/brands/samsung.webp" },
			{ name: "LG", logo: "/images/brands/lg.webp" },
			{ name: "Sony", logo: "/images/brands/sony.webp" },
			{ name: "Microsoft", logo: "/images/brands/microsoft.webp" },
		];
		fs.writeFileSync(ictPath, JSON.stringify(ict, null, "\t") + "\n");
	}

	const all = [
		...JSON.parse(fs.readFileSync(ictPath, "utf8")),
		...JSON.parse(fs.readFileSync("public/fakedata/data-center.json", "utf8")),
	];
	const still = [
		...new Set(
			all.flatMap((g) => (g.brands || []).filter((b) => !b.logo).map((b) => b.name))
		),
	].sort();
	console.log("Still text-only:", still.join(", ") || "none");
	console.log(
		"Logos linked:",
		all.reduce((n, g) => n + (g.brands || []).filter((b) => b.logo).length, 0)
	);
})();
