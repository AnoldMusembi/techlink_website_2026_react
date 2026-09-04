/**
 * Enrich ICT + Data Center category JSON with slugs, paths, and brand logo refs.
 * Uses existing local images only (no network downloads).
 * Run: node scripts/enrich-category-data.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const imgDir = path.join(publicDir, "images");
const brandsDir = path.join(imgDir, "brands");

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
				.replace(/related accessory brands/i, "")
				.trim()
		)
		.filter((s) => s && s.length > 1 && !/^and$/i.test(s));
}

const LOGO_ALIASES = {
	microsoft: "microsoft.webp",
	"microsoft 365": "microsoft.webp",
	"microsoft azure": "microsoft.webp",
	"microsoft copilot": "microsoft.webp",
	"microsoft (defender/sentinel)": "microsoft.webp",
	"microsoft 365 (onedrive/sharepoint)": "microsoft.webp",
	windows: "microsoft.webp",
	"windows 11": "microsoft.webp",
	"windows server": "microsoft.webp",
	"exchange server": "microsoft.webp",
	"sql server": "microsoft.webp",
	sharepoint: "microsoft.webp",
	"dynamics 365": "microsoft.webp",
	"power bi": "microsoft.webp",
	"hyper-v": "microsoft.webp",
	onedrive: "microsoft.webp",
	lenovo: "lenovo.webp",
	hp: "hp.webp",
	asus: "asus.webp",
	cisco: "cisco.webp",
	dell: "dell.webp",
	"dell technologies": "dell.webp",
	fortinet: "fortinet.webp",
	sophos: "sophos.webp",
	"palo alto networks": "paloalto.webp",
	paloalto: "paloalto.webp",
	epson: "epson.webp",
	canon: "canon.webp",
	brother: "brother.webp",
	adobe: "adobe.webp",
	corel: "corel.webp",
	autodesk: "autodesk.webp",
	eset: "eset.webp",
	symantec: "symantec.webp",
	norton: "norton.webp",
	quickbooks: "quickbooks.webp",
	sage: "sage.webp",
	"sap business one": "sap.webp",
	sap: "sap.webp",
	odoo: "odoo.webp",
	zoho: "zoho.webp",
	tableau: "tableau.webp",
	tally: "tally.webp",
	sunmi: "sunmi.webp",
	pax: "pax.webp",
	zebra: "zebra.webp",
	honeywell: "honeywell.webp",
	posiflex: "posiflex.webp",
	oracle: "oracle.webp",
	"oracle cloud": "oracle.webp",
	hikvision: "hikvision.webp",
	dahua: "dahua.webp",
	uniview: "uniview.webp",
	zkteco: "zkteco.webp",
	hid: "hid.webp",
	suprema: "suprema.webp",
	axis: "axis.webp",
	bosch: "bosch.webp",
	ubiquiti: "ubiquiti.webp",
	sony: "sony.webp",
	"d-link": "d-link.webp",
	qmatic: "qmatic.webp",
	"apc by schneider electric": "apc.webp",
	apc: "apc.webp",
	"schneider electric": "schneider-electric.webp",
	"schneider electric (apc)": "apc.webp",
	"schneider electric (ecostruxure/netbotz)": "schneider-electric.webp",
	eaton: "eaton.webp",
	vertiv: "vertiv.webp",
	"vertiv (liebert)": "vertiv.webp",
	"vertiv geist": "vertiv.webp",
	logitech: "logitech.webp",
	sandisk: "sandisk.webp",
	kingston: "kingston.webp",
	hpe: "hpe.webp",
	"hpe aruba": "aruba.webp",
	qnap: "qnap.webp",
	synology: "synology.webp",
	veeam: "veeam.webp",
	netapp: "netapp.webp",
	veritas: "veritas.webp",
	commvault: "commvault.webp",
	acronis: "acronis.webp",
	"red hat": "red-hat.webp",
	vmware: "vmware.webp",
	canonical: "canonical.webp",
	"canonical (ubuntu)": "canonical.webp",
	ubuntu: "canonical.webp",
	citrix: "citrix.webp",
	sonicwall: "sonicwall.webp",
	"check point": "check-point.webp",
	barracuda: "barracuda.webp",
	aruba: "aruba.webp",
	juniper: "juniper.webp",
	zscaler: "zscaler.webp",
	aws: "aws.webp",
	mikrotik: "mikrotik.webp",
	netgear: "netgear.webp",
	"tp-link": "tp-link.webp",
	nexans: "nexans.webp",
	legrand: "legrand.webp",
	panduit: "panduit.webp",
	rittal: "rittal.webp",
	stulz: "stulz.webp",
	lg: "lg.webp",
	samsung: "samsung.webp",
	huawei: "huawei.webp",
	siemens: "siemens.webp",
	"google cloud platform": "google-cloud.webp",
	"ibm cloud": "ibm.webp",
	ibm: "ibm.webp",
	"3m": "3m.webp",
	"3m (esd)": "3m.webp",
	akcp: "akcp.webp",
	asm: "asm.webp",
	arista: "arista.webp",
	asenware: "asenware.webp",
	"atlas security systems": "atlas-security-systems.webp",
	daikin: "daikin.webp",
	delta: "delta.webp",
	entrust: "entrust.webp",
	"extreme networks": "extreme-networks.webp",
	f5: "f5.webp",
	fm200: "fm200.webp",
	fike: "fike.webp",
	giganet: "giganet.webp",
	"global fire equipment": "global-fire-equipment.webp",
	infoblox: "infoblox.webp",
	kidde: "kidde.webp",
	linksys: "linksys.webp",
	luminous: "luminous.webp",
	mercury: "mercury.webp",
	molex: "molex.webp",
	must: "must.webp",
	"nora systems": "nora-systems.webp",
	"nora systems (esd)": "nora-systems.webp",
	qsys: "qsys.webp",
	queuebee: "queuebee.webp",
	"r&m": "r-m.webp",
	raritan: "raritan.webp",
	"redstar africa": "redstar-africa.webp",
	ruckus: "ruckus.webp",
	ruijie: "ruijie.webp",
	shield: "shield.webp",
	siemon: "siemon.webp",
	starlink: "starlink.webp",
	"sunbird dcim": "sunbird-dcim.webp",
	tate: "tate.webp",
	"tripp lite": "tripp-lite.webp",
	tronic: "tronic.webp",
	tyco: "tyco.webp",
	"victron energy": "victron-energy.webp",
	wavetec: "wavetec.webp",
};

const existingBrandFiles = new Set(
	fs.existsSync(brandsDir)
		? fs.readdirSync(brandsDir).filter((f) => /\.(webp|png|svg|jpg)$/i.test(f))
		: []
);

function resolveLogo(name) {
	const key = name.toLowerCase().trim();
	if (LOGO_ALIASES[key]) {
		const file = LOGO_ALIASES[key];
		if (existingBrandFiles.has(file)) return `/images/brands/${file}`;
	}
	const fileKey = key.replace(/[^a-z0-9]+/g, "-") + ".webp";
	if (existingBrandFiles.has(fileKey)) return `/images/brands/${fileKey}`;
	// Exact token match only — avoid HPE matching HP
	const tokens = key.split(/[^a-z0-9]+/).filter(Boolean);
	for (const [alias, file] of Object.entries(LOGO_ALIASES)) {
		const aliasTokens = alias.split(/[^a-z0-9]+/).filter(Boolean);
		if (
			tokens.length &&
			aliasTokens.length &&
			tokens.join(" ") === aliasTokens.join(" ")
		) {
			if (existingBrandFiles.has(file)) return `/images/brands/${file}`;
		}
	}
	return null;
}

// Prefer more category-relevant existing local images
const ICT_IMGS = {
	1: "/images/service/service-1.webp",
	2: "/images/service/service-5.webp",
	3: "/images/service/service-4.webp",
	4: "/images/service/offer-2.webp",
	5: "/images/service/service-6.webp",
	6: "/images/service/offer-1.webp",
	7: "/images/service/service-2.webp",
	8: "/images/industries/education.webp",
	9: "/images/service/service-3.webp",
	10: "/images/service/offer-5.webp",
};

const DC_IMGS = {
	1: "/images/service/service-3.webp",
	2: "/images/service/service-4.webp",
	3: "/images/service/service-2.webp",
	4: "/images/service/offer-4.webp",
	5: "/images/industries/manufacturing.webp",
	6: "/images/service/offer-3.webp",
	7: "/images/industries/real-estate.webp",
	8: "/images/service/detail-8.webp",
	9: "/images/service/service-5.webp",
	10: "/images/service/service-6.webp",
	11: "/images/service/detail-3.webp",
};

function enrich(groups, basePath, imgMap, folder) {
	return groups.map((group) => {
		const slug = slugify(group.title);
		const catImg = path.join(imgDir, folder, `${slug}.webp`);
		const names = parseBrandNames(group.brands);
		const brandObjs = [];
		const seen = new Set();
		for (const name of names) {
			const clean = name.replace(/\(.*?\)/g, "").trim();
			if (!clean || seen.has(clean.toLowerCase())) continue;
			seen.add(clean.toLowerCase());
			const logo = resolveLogo(clean);
			brandObjs.push(logo ? { name: clean, logo } : { name: clean });
		}
		const img =
			fs.existsSync(catImg) && fs.statSync(catImg).size > 5000
				? `/images/${folder}/${slug}.webp`
				: imgMap[group.id] || group.img;
		return {
			...group,
			slug,
			path: `${basePath}/${slug}`,
			img,
			brands: brandObjs,
		};
	});
}

const ictRaw = JSON.parse(
	fs.readFileSync(path.join(publicDir, "fakedata", "home-work.json"), "utf8")
);
const dcRaw = JSON.parse(
	fs.readFileSync(path.join(publicDir, "fakedata", "data-center.json"), "utf8")
);

// If already enriched (brands as array of objects), still re-run cleanly from title/items
const ictBase = ictRaw.map((g) => ({
	...g,
	brands: Array.isArray(g.brands)
		? g.brands.map((b) => (typeof b === "string" ? b : b.name)).join(", ")
		: g.brands,
}));
const dcBase = dcRaw.map((g) => ({
	...g,
	brands: Array.isArray(g.brands)
		? g.brands.map((b) => (typeof b === "string" ? b : b.name)).join(", ")
		: g.brands,
}));

const ictOut = enrich(ictBase, "/ict-products", ICT_IMGS, "ict-products");
const dcOut = enrich(dcBase, "/data-center", DC_IMGS, "data-center");

fs.writeFileSync(
	path.join(publicDir, "fakedata", "home-work.json"),
	JSON.stringify(ictOut, null, "\t") + "\n"
);
fs.writeFileSync(
	path.join(publicDir, "fakedata", "data-center.json"),
	JSON.stringify(dcOut, null, "\t") + "\n"
);

console.log(
	"Enriched",
	ictOut.length,
	"ICT +",
	dcOut.length,
	"DC categories. Logos linked:",
	[...ictOut, ...dcOut].reduce(
		(n, g) => n + g.brands.filter((b) => b.logo).length,
		0
	)
);
