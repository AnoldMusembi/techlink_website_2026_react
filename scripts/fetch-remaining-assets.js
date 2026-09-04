/**
 * Resume download of remaining brand logos + category images.
 * Run: node scripts/fetch-remaining-assets.js
 */
const fs = require("fs");
const https = require("https");
const path = require("path");

const root = path.join(__dirname, "..");
const imgDir = path.join(root, "public", "images");
const sharp = require("sharp");

function download(url) {
	return new Promise((resolve, reject) => {
		const req = https.get(
			url,
			{ headers: { "User-Agent": "Mozilla/5.0 TechLink/1.0", Accept: "image/*" }, timeout: 30000 },
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

const remainingLogos = {
	epson: "epson.com",
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
	bosch: "boschsecurity.com",
	ubiquiti: "ui.com",
	sony: "sony.com",
	"d-link": "dlink.com",
	qmatic: "qmatic.com",
	apc: "apc.com",
	"schneider-electric": "se.com",
	eaton: "eaton.com",
	vertiv: "vertiv.com",
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
	"red-hat": "redhat.com",
	vmware: "vmware.com",
	canonical: "canonical.com",
	citrix: "citrix.com",
	sonicwall: "sonicwall.com",
	"check-point": "checkpoint.com",
	barracuda: "barracuda.com",
	aruba: "arubanetworks.com",
	juniper: "juniper.net",
	zscaler: "zscaler.com",
	aws: "aws.amazon.com",
	mikrotik: "mikrotik.com",
	netgear: "netgear.com",
	"tp-link": "tp-link.com",
	nexans: "nexans.com",
	legrand: "legrand.com",
	panduit: "panduit.com",
	rittal: "rittal.com",
	stulz: "stulz.com",
	lg: "lg.com",
	samsung: "samsung.com",
	huawei: "huawei.com",
	siemens: "siemens.com",
	"google-cloud": "cloud.google.com",
	ibm: "ibm.com",
};

const ICT_IMAGES = {
	"computing-devices": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
	"printers-and-office-equipment": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1200&q=80",
	"software-and-licensing": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
	"business-software-solutions": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
	"audio-visual-and-collaboration-systems": "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
	"pos-systems": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
	"security-and-access-control": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
	"people-counting-and-queue-management": "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80",
	"power-protection-and-backup-systems": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
	"peripherals-and-accessories": "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
};

const DC_IMAGES = {
	"enterprise-servers-and-storage": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
	"server-software-and-licensing": "https://images.unsplash.com/photo-1544197150-b99a580bb7a2?auto=format&fit=crop&w=1200&q=80",
	"network-and-cyber-security-solutions": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
	"enterprise-networks": "https://images.unsplash.com/photo-1544197150-b99a580bb7a2?auto=format&fit=crop&w=1200&q=80",
	"structured-cabling": "https://images.unsplash.com/photo-1551703599-6b3e8379ee28?auto=format&fit=crop&w=1200&q=80",
	"cable-routing-and-management-systems": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
	"datacenter-floor-solutions": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
	"datacenter-cooling": "https://images.unsplash.com/photo-1597852074816-d933c7d2bbfc?auto=format&fit=crop&w=1200&q=80",
	"fire-protection-systems": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
	"cloud-computing-services-and-cloud-storage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
	"environmental-monitoring-and-dcim": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
};

async function saveLogo(key, domain) {
	const dest = path.join(imgDir, "brands", `${key}.webp`);
	if (fs.existsSync(dest) && fs.statSync(dest).size > 400) {
		console.log("skip logo", key);
		return true;
	}
	for (const url of [
		`https://logo.clearbit.com/${domain}?size=128`,
		`https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
	]) {
		try {
			const buf = await download(url);
			if (!buf || buf.length < 200) continue;
			await sharp(buf)
				.resize(160, 80, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
				.webp({ quality: 90 })
				.toFile(dest);
			console.log("logo", key);
			return true;
		} catch (e) {
			// next
		}
	}
	console.log("fail logo", key);
	return false;
}

async function saveCat(folder, slug, url) {
	const dir = path.join(imgDir, folder);
	fs.mkdirSync(dir, { recursive: true });
	const dest = path.join(dir, `${slug}.webp`);
	if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
		console.log("skip img", folder, slug);
		return `/images/${folder}/${slug}.webp`;
	}
	try {
		const buf = await download(url);
		await sharp(buf).resize(960, 540, { fit: "cover", position: "attention" }).webp({ quality: 82 }).toFile(dest);
		console.log("img", folder, slug);
		return `/images/${folder}/${slug}.webp`;
	} catch (e) {
		console.log("fail img", slug, e.message);
		return null;
	}
}

(async () => {
	for (const [key, domain] of Object.entries(remainingLogos)) {
		await saveLogo(key, domain);
	}
	const ictPaths = {};
	for (const [slug, url] of Object.entries(ICT_IMAGES)) {
		ictPaths[slug] = await saveCat("ict-products", slug, url);
	}
	const dcPaths = {};
	for (const [slug, url] of Object.entries(DC_IMAGES)) {
		dcPaths[slug] = await saveCat("data-center", slug, url);
	}

	// patch JSON img paths + logos
	const { execSync } = require("child_process");
	execSync("node scripts/enrich-category-data.js", { cwd: root, stdio: "inherit" });

	function patchImgs(file, map, folder) {
		const data = JSON.parse(fs.readFileSync(file, "utf8"));
		for (const g of data) {
			const p = map[g.slug];
			if (p) g.img = p;
			else if (fs.existsSync(path.join(imgDir, folder, `${g.slug}.webp`))) {
				g.img = `/images/${folder}/${g.slug}.webp`;
			}
		}
		fs.writeFileSync(file, JSON.stringify(data, null, "\t") + "\n");
	}

	patchImgs(path.join(root, "public/fakedata/home-work.json"), ictPaths, "ict-products");
	patchImgs(path.join(root, "public/fakedata/data-center.json"), dcPaths, "data-center");
	// re-enrich logos after new files exist
	execSync("node scripts/enrich-category-data.js", { cwd: root, stdio: "inherit" });
	patchImgs(path.join(root, "public/fakedata/home-work.json"), ictPaths, "ict-products");
	patchImgs(path.join(root, "public/fakedata/data-center.json"), dcPaths, "data-center");
	console.log("done");
})().catch((e) => {
	console.error(e);
	process.exit(1);
});
