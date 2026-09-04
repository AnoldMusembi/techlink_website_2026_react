/**
 * Download missing brand logos and re-enrich category JSON.
 * Run: node scripts/download-missing-logos.js
 */
const fs = require("fs");
const https = require("https");
const path = require("path");
const sharp = require("sharp");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const brandsDir = path.join(root, "public", "images", "brands");

const MISSING = {
	epson: ["epson.com", "epson.eu"],
	honeywell: ["honeywell.com", "sps.honeywell.com"],
	uniview: ["uniview.com", "uni-view.com"],
	netapp: ["netapp.com"],
	legrand: ["legrand.com", "legrand.us"],
	"3m": ["3m.com"],
	akcp: ["akcp.com"],
	asm: ["asm.com", "asm-global.com"],
	arista: ["arista.com"],
	asenware: ["asenware.com"],
	"atlas-security-systems": ["atlassecurity.co.ke", "atlas.co.ke"],
	daikin: ["daikin.com", "daikin.eu"],
	delta: ["deltaww.com", "deltapowersolutions.com"],
	entrust: ["entrust.com"],
	"extreme-networks": ["extremenetworks.com"],
	f5: ["f5.com"],
	fm200: ["chemours.com", "kidde-fenwal.com"],
	fike: ["fike.com"],
	giganet: ["giganet.co.ke", "giganet.com"],
	"global-fire-equipment": ["globalfire.pt", "globalfire.com"],
	infoblox: ["infoblox.com"],
	kidde: ["kidde.com", "kidde-fenwal.com"],
	linksys: ["linksys.com"],
	luminous: ["luminousindia.com"],
	mercury: ["mercuryups.com", "mercurysystems.com"],
	molex: ["molex.com"],
	must: ["mustpower.com", "mustsolar.com"],
	"nora-systems": ["nora.com", "nora-flooring.com"],
	qsys: ["qsys.com", "qsc.com"],
	queuebee: ["queuebee.com"],
	"r-m": ["rdm.com", "rdm.com"],
	raritan: ["raritan.com"],
	"redstar-africa": ["redstarafrica.com"],
	ruckus: ["ruckusnetworks.com", "commscope.com"],
	ruijie: ["ruijienetworks.com"],
	shield: ["shieldfire.co.uk", "shieldglobal.com"],
	siemon: ["siemon.com"],
	starlink: ["starlink.com"],
	"sunbird-dcim": ["sunbirddcim.com"],
	tate: ["tateinc.com"],
	"tripp-lite": ["tripplite.com", "eaton.com"],
	tronic: ["tronic.co.ke"],
	tyco: ["tyco.com", "jci.com"],
	"victron-energy": ["victronenergy.com"],
	wavetec: ["wavetec.com"],
};

function download(url) {
	return new Promise((resolve, reject) => {
		const req = https.get(
			url,
			{
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Techlink/1.0",
					Accept: "image/*,*/*",
				},
				timeout: 25000,
			},
			(res) => {
				if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
					return download(res.headers.location).then(resolve, reject);
				}
				if (res.statusCode !== 200) {
					res.resume();
					return reject(new Error(String(res.statusCode)));
				}
				const chunks = [];
				res.on("data", (c) => chunks.push(c));
				res.on("end", () => resolve(Buffer.concat(chunks)));
			}
		);
		req.on("error", reject);
		req.on("timeout", () => {
			req.destroy();
			reject(new Error("timeout"));
		});
	});
}

function logoUrls(domain) {
	return [
		`https://logo.clearbit.com/${domain}?size=256`,
		`https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
		`https://icons.duckduckgo.com/ip3/${domain}.ico`,
	];
}

async function saveLogo(key, domains) {
	const dest = path.join(brandsDir, `${key}.webp`);
	if (fs.existsSync(dest) && fs.statSync(dest).size > 400) {
		console.log("skip", key);
		return true;
	}
	for (const domain of domains) {
		for (const url of logoUrls(domain)) {
			try {
				const buf = await download(url);
				if (!buf || buf.length < 150) continue;
				await sharp(buf)
					.ensureAlpha()
					.resize(180, 90, {
						fit: "contain",
						background: { r: 255, g: 255, b: 255, alpha: 0 },
					})
					.webp({ quality: 92 })
					.toFile(dest);
				if (fs.statSync(dest).size < 200) {
					fs.unlinkSync(dest);
					continue;
				}
				console.log("ok", key, "via", domain);
				return true;
			} catch {
				// try next
			}
		}
	}
	console.log("FAIL", key);
	return false;
}

(async () => {
	fs.mkdirSync(brandsDir, { recursive: true });
	let ok = 0;
	let fail = 0;
	for (const [key, domains] of Object.entries(MISSING)) {
		const saved = await saveLogo(key, domains);
		if (saved) ok++;
		else fail++;
	}
	console.log(`Downloaded/kept: ${ok}, failed: ${fail}`);
	execSync("node scripts/enrich-category-data.js", {
		cwd: root,
		stdio: "inherit",
	});

	// restore AV brands after enrich (enrich may wipe custom list if source string was bad)
	const ictPath = path.join(root, "public", "fakedata", "home-work.json");
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
		...JSON.parse(
			fs.readFileSync(path.join(root, "public", "fakedata", "data-center.json"), "utf8")
		),
	];
	const still = [];
	for (const g of all) {
		for (const b of g.brands || []) {
			if (!b.logo) still.push(b.name);
		}
	}
	console.log("Still text-only:", [...new Set(still)].sort().join(", ") || "none");
})().catch((e) => {
	console.error(e);
	process.exit(1);
});
