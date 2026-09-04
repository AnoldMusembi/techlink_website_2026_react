/**
 * Enrich ICT + Data Center category data and download images/logos.
 * Run: node scripts/build-category-assets.js
 */
const fs = require("fs");
const https = require("https");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const imgDir = path.join(publicDir, "images");

function ensureSharp() {
	try {
		require.resolve("sharp");
	} catch {
		console.log("Installing sharp...");
		execSync("npm install sharp --no-save", { cwd: root, stdio: "inherit" });
	}
	return require("sharp");
}

function download(url) {
	return new Promise((resolve, reject) => {
		const req = https.get(
			url,
			{ headers: { "User-Agent": "Mozilla/5.0 TechLink/1.0", Accept: "image/*" } },
			(res) => {
				if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
					return download(res.headers.location).then(resolve, reject);
				}
				if (res.statusCode !== 200) {
					res.resume();
					return reject(new Error(`${res.statusCode} ${url}`));
				}
				const chunks = [];
				res.on("data", (c) => chunks.push(c));
				res.on("end", () => resolve(Buffer.concat(chunks)));
			}
		);
		req.on("error", reject);
		req.setTimeout(45000, () => {
			req.destroy();
			reject(new Error("timeout " + url));
		});
	});
}

function slugify(title) {
	return title
		.toLowerCase()
		.replace(/&/g, " and ")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function parseBrandNames(brands) {
	if (Array.isArray(brands)) {
		return brands.map((b) => (typeof b === "string" ? b : b.name)).filter(Boolean);
	}
	return String(brands || "")
		.split(/,| and /i)
		.map((s) =>
			s
				.replace(/other trusted global brands/i, "")
				.replace(/related office brands/i, "")
				.replace(/leading av.*/i, "")
				.replace(/and related accessory brands/i, "")
				.trim()
		)
		.filter((s) => s && s.length > 1 && !/^and$/i.test(s));
}

const EXISTING_LOGOS = {
	microsoft: "/images/brands/microsoft.webp",
	"microsoft 365": "/images/brands/microsoft.webp",
	"microsoft azure": "/images/brands/microsoft.webp",
	"microsoft copilot": "/images/brands/microsoft.webp",
	"microsoft defender": "/images/brands/microsoft.webp",
	windows: "/images/brands/microsoft.webp",
	"windows 11": "/images/brands/microsoft.webp",
	"windows server": "/images/brands/microsoft.webp",
	"exchange server": "/images/brands/microsoft.webp",
	"sql server": "/images/brands/microsoft.webp",
	sharepoint: "/images/brands/microsoft.webp",
	"dynamics 365": "/images/brands/microsoft.webp",
	"power bi": "/images/brands/microsoft.webp",
	"hyper-v": "/images/brands/microsoft.webp",
	onedrive: "/images/brands/microsoft.webp",
	lenovo: "/images/brands/lenovo.webp",
	hp: "/images/brands/hp.webp",
	asus: "/images/brands/asus.webp",
	cisco: "/images/brands/cisco.webp",
	dell: "/images/brands/dell.webp",
	"dell technologies": "/images/brands/dell.webp",
	fortinet: "/images/brands/fortinet.webp",
	sophos: "/images/brands/sophos.webp",
	"palo alto networks": "/images/brands/paloalto.webp",
	paloalto: "/images/brands/paloalto.webp",
};

// domain used for Clearbit logo fetch
const BRAND_DOMAINS = {
	epson: "epson.com",
	canon: "canon.com",
	brother: "brother.com",
	adobe: "adobe.com",
	corel: "coreldraw.com",
	autodesk: "autodesk.com",
	eset: "eset.com",
	symantec: "broadcom.com",
	norton: "norton.com",
	quickbooks: "quickbooks.intuit.com",
	sage: "sage.com",
	"sap business one": "sap.com",
	sap: "sap.com",
	odoo: "odoo.com",
	zoho: "zoho.com",
	tableau: "tableau.com",
	tally: "tallysolutions.com",
	sunmi: "sunmi.com",
	pax: "paxtechnology.com",
	zebra: "zebra.com",
	honeywell: "honeywell.com",
	posiflex: "posiflex.com",
	oracle: "oracle.com",
	hikvision: "hikvision.com",
	dahua: "dahuasecurity.com",
	uniview: "uniview.com",
	zkteco: "zkteco.com",
	hid: "hidglobal.com",
	suprema: "supremainc.com",
	axis: "axis.com",
	bosch: "bosch.com",
	ubiquiti: "ui.com",
	sony: "sony.com",
	"d-link": "dlink.com",
	qmatic: "qmatic.com",
	wavetec: "wavetec.com",
	"apc by schneider electric": "apc.com",
	apc: "apc.com",
	"schneider electric": "se.com",
	eaton: "eaton.com",
	vertiv: "vertiv.com",
	luminous: "luminousindia.com",
	"victron energy": "victronenergy.com",
	delta: "deltapowersolutions.com",
	mercury: "mercurysystems.com",
	logitech: "logitech.com",
	sandisk: "westerndigital.com",
	kingston: "kingston.com",
	hpe: "hpe.com",
	qnap: "qnap.com",
	synology: "synology.com",
	veeam: "veeam.com",
	netapp: "netapp.com",
	veritas: "veritas.com",
	commvault: "commvault.com",
	acronis: "acronis.com",
	"red hat": "redhat.com",
	vmware: "vmware.com",
	canonical: "canonical.com",
	ubuntu: "ubuntu.com",
	citrix: "citrix.com",
	sonicwall: "sonicwall.com",
	"check point": "checkpoint.com",
	barracuda: "barracuda.com",
	aruba: "arubanetworks.com",
	"hpe aruba": "arubanetworks.com",
	juniper: "juniper.net",
	infoblox: "infoblox.com",
	zscaler: "zscaler.com",
	f5: "f5.com",
	aws: "aws.amazon.com",
	entrust: "entrust.com",
	mikrotik: "mikrotik.com",
	arista: "arista.com",
	netgear: "netgear.com",
	starlink: "starlink.com",
	ruckus: "ruckusnetworks.com",
	"extreme networks": "extremenetworks.com",
	linksys: "linksys.com",
	"tp-link": "tp-link.com",
	ruijie: "ruijienetworks.com",
	nexans: "nexans.com",
	legrand: "legrand.com",
	panduit: "panduit.com",
	molex: "molex.com",
	giganet: "giganet.co.ke",
	siemon: "siemon.com",
	rittal: "rittal.com",
	"tripp lite": "tripplite.com",
	tate: "tateinc.com",
	stulz: "stulz.com",
	lg: "lg.com",
	samsung: "samsung.com",
	daikin: "daikin.com",
	huawei: "huawei.com",
	kidde: "kidde.com",
	tyco: "tyco.com",
	siemens: "siemens.com",
	fm200: "chemours.com",
	fike: "fike.com",
	"google cloud platform": "cloud.google.com",
	"ibm cloud": "ibm.com",
	"oracle cloud": "oracle.com",
	akcp: "akcp.com",
	raritan: "raritan.com",
	sunbird: "sunbirddcim.com",
};

const ICT_IMAGES = {
	1: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
	2: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1200&q=80",
	3: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
	4: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
	5: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
	6: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
	7: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
	8: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80",
	9: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
	10: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
};

const DC_IMAGES = {
	1: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
	2: "https://images.unsplash.com/photo-1544197150-b99a580bb7a2?auto=format&fit=crop&w=1200&q=80",
	3: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
	4: "https://images.unsplash.com/photo-1544197150-b99a580bb7a2?auto=format&fit=crop&w=1200&q=80",
	5: "https://images.unsplash.com/photo-1551703599-6b3e8379ee28?auto=format&fit=crop&w=1200&q=80",
	6: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
	7: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
	8: "https://images.unsplash.com/photo-1597852074816-d933c7d2bbfc?auto=format&fit=crop&w=1200&q=80",
	9: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
	10: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
	11: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
};

async function saveCategoryImage(sharp, url, dest) {
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
		console.log("skip", path.relative(root, dest));
		return;
	}
	const buf = await download(url);
	await sharp(buf).resize(960, 540, { fit: "cover", position: "attention" }).webp({ quality: 82 }).toFile(dest);
	console.log("img", path.relative(root, dest));
}

async function saveBrandLogo(sharp, key, domain, dest) {
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	if (fs.existsSync(dest) && fs.statSync(dest).size > 500) {
		return dest;
	}
	const urls = [
		`https://logo.clearbit.com/${domain}?size=128`,
		`https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
	];
	for (const url of urls) {
		try {
			const buf = await download(url);
			if (buf.length < 200) continue;
			await sharp(buf)
				.resize(160, 80, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
				.webp({ quality: 90 })
				.toFile(dest);
			console.log("logo", key);
			return dest;
		} catch (e) {
			// try next
		}
	}
	return null;
}

function resolveLogo(name, downloaded) {
	const key = name.toLowerCase().trim();
	if (EXISTING_LOGOS[key]) return EXISTING_LOGOS[key];
	const fileKey = key.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
	if (downloaded[fileKey]) return downloaded[fileKey];
	// fuzzy match existing
	for (const [k, v] of Object.entries(EXISTING_LOGOS)) {
		if (key.includes(k) || k.includes(key)) return v;
	}
	for (const [k, v] of Object.entries(downloaded)) {
		if (key.includes(k) || k.includes(key)) return v;
	}
	return null;
}

function enrichGroup(group, basePath, imgPath, downloaded) {
	const slug = slugify(group.title);
	const names = parseBrandNames(group.brands);
	const brandObjs = [];
	const seen = new Set();
	for (const name of names) {
		const clean = name.replace(/\(.*?\)/g, "").trim();
		if (!clean || seen.has(clean.toLowerCase())) continue;
		seen.add(clean.toLowerCase());
		const logo = resolveLogo(clean, downloaded);
		brandObjs.push(logo ? { name: clean, logo } : { name: clean });
	}
	return {
		...group,
		slug,
		path: `${basePath}/${slug}`,
		img: imgPath,
		brands: brandObjs,
	};
}

async function main() {
	const sharp = ensureSharp();
	const downloaded = {};

	// download brand logos we don't already have
	for (const [key, domain] of Object.entries(BRAND_DOMAINS)) {
		const fileKey = key.replace(/[^a-z0-9]+/g, "-");
		const dest = path.join(imgDir, "brands", `${fileKey}.webp`);
		const existingKey = Object.keys(EXISTING_LOGOS).find((k) => k === key || key.includes(k));
		if (existingKey && EXISTING_LOGOS[existingKey].includes(fileKey) === false && fs.existsSync(path.join(imgDir, "brands", path.basename(EXISTING_LOGOS[existingKey])))) {
			// keep mapping via resolveLogo
		}
		if (EXISTING_LOGOS[key]) {
			downloaded[fileKey] = EXISTING_LOGOS[key];
			continue;
		}
		const saved = await saveBrandLogo(sharp, fileKey, domain, dest);
		if (saved) downloaded[fileKey] = `/images/brands/${fileKey}.webp`;
	}

	const ictDir = path.join(imgDir, "ict-products");
	const dcDir = path.join(imgDir, "data-center");
	fs.mkdirSync(ictDir, { recursive: true });
	fs.mkdirSync(dcDir, { recursive: true });

	const ictRaw = JSON.parse(fs.readFileSync(path.join(publicDir, "fakedata", "home-work.json"), "utf8"));
	const dcRaw = JSON.parse(fs.readFileSync(path.join(publicDir, "fakedata", "data-center.json"), "utf8"));

	const ictOut = [];
	for (const g of ictRaw) {
		const slug = slugify(g.title);
		const dest = path.join(ictDir, `${slug}.webp`);
		const url = ICT_IMAGES[g.id];
		if (url) {
			try {
				await saveCategoryImage(sharp, url, dest);
			} catch (e) {
				console.warn("ict img fail", g.id, e.message);
			}
		}
		const imgPath = fs.existsSync(dest) ? `/images/ict-products/${slug}.webp` : g.img;
		ictOut.push(enrichGroup(g, "/ict-products", imgPath, downloaded));
	}

	const dcOut = [];
	for (const g of dcRaw) {
		const slug = slugify(g.title);
		const dest = path.join(dcDir, `${slug}.webp`);
		const url = DC_IMAGES[g.id];
		if (url) {
			try {
				await saveCategoryImage(sharp, url, dest);
			} catch (e) {
				console.warn("dc img fail", g.id, e.message);
			}
		}
		const imgPath = fs.existsSync(dest) ? `/images/data-center/${slug}.webp` : g.img;
		dcOut.push(enrichGroup(g, "/data-center", imgPath, downloaded));
	}

	fs.writeFileSync(path.join(publicDir, "fakedata", "home-work.json"), JSON.stringify(ictOut, null, "\t") + "\n");
	fs.writeFileSync(path.join(publicDir, "fakedata", "data-center.json"), JSON.stringify(dcOut, null, "\t") + "\n");
	console.log("Wrote enriched JSON:", ictOut.length, "ICT,", dcOut.length, "DC");
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
