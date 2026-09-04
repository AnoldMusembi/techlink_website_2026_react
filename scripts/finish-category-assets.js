/**
 * Continue downloading remaining brand logos + category images.
 * Run: node scripts/finish-category-assets.js
 */
const fs = require("fs");
const https = require("https");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const imgDir = path.join(root, "public", "images");

function sharp() {
	try {
		return require("sharp");
	} catch {
		execSync("npm install sharp --no-save", { cwd: root, stdio: "inherit" });
		return require("sharp");
	}
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
					return reject(new Error(String(res.statusCode)));
				}
				const chunks = [];
				res.on("data", (c) => chunks.push(c));
				res.on("end", () => resolve(Buffer.concat(chunks)));
			}
		);
		req.on("error", reject);
		req.setTimeout(30000, () => {
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
	bosch: "bosch.com",
	ubiquiti: "ui.com",
	sony: "sony.com",
	"d-link": "dlink.com",
	qmatic: "qmatic.com",
	wavetec: "wavetec.com",
	apc: "apc.com",
	"schneider-electric": "se.com",
	eaton: "eaton.com",
	vertiv: "vertiv.com",
	luminous: "luminousindia.com",
	"victron-energy": "victronenergy.com",
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
	infoblox: "infoblox.com",
	zscaler: "zscaler.com",
	f5: "f5.com",
	aws: "aws.amazon.com",
	mikrotik: "mikrotik.com",
	arista: "arista.com",
	netgear: "netgear.com",
	starlink: "starlink.com",
	ruckus: "ruckusnetworks.com",
	"extreme-networks": "extremenetworks.com",
	linksys: "linksys.com",
	"tp-link": "tp-link.com",
	ruijie: "ruijienetworks.com",
	nexans: "nexans.com",
	legrand: "legrand.com",
	panduit: "panduit.com",
	molex: "molex.com",
	siemon: "siemon.com",
	rittal: "rittal.com",
	"tripp-lite": "tripplite.com",
	stulz: "stulz.com",
	lg: "lg.com",
	samsung: "samsung.com",
	daikin: "daikin.com",
	huawei: "huawei.com",
	kidde: "kidde.com",
	siemens: "siemens.com",
	fike: "fike.com",
	"google-cloud-platform": "cloud.google.com",
	"ibm-cloud": "ibm.com",
	akcp: "akcp.com",
	raritan: "raritan.com",
};

const ICT_IMAGES = {
	"computing-devices":
		"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
	"printers-and-office-equipment":
		"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1200&q=80",
	"software-and-licensing":
		"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
	"business-software-solutions":
		"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
	"audio-visual-and-collaboration-systems":
		"https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
	"pos-systems":
		"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
	"security-and-access-control":
		"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
	"people-counting-and-queue-management":
		"https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80",
	"power-protection-and-backup-systems":
		"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
	"peripherals-and-accessories":
		"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
};

const DC_IMAGES = {
	"enterprise-servers-and-storage":
		"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
	"server-software-and-licensing":
		"https://images.unsplash.com/photo-1544197150-b99a580bb7a2?auto=format&fit=crop&w=1200&q=80",
	"network-and-cyber-security-solutions":
		"https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
	"enterprise-networks":
		"https://images.unsplash.com/photo-1544197150-b99a580bb7a2?auto=format&fit=crop&w=1200&q=80",
	"structured-cabling":
		"https://images.unsplash.com/photo-1551703599-6b3e8379ee28?auto=format&fit=crop&w=1200&q=80",
	"cable-routing-and-management-systems":
		"https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
	"datacenter-floor-solutions":
		"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
	"datacenter-cooling":
		"https://images.unsplash.com/photo-1597852074816-d933c7d2bbfc?auto=format&fit=crop&w=1200&q=80",
	"fire-protection-systems":
		"https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
	"cloud-computing-services-and-cloud-storage":
		"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
	"environmental-monitoring-and-dcim":
		"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
};

async function saveLogo(s, key, domain) {
	const dest = path.join(imgDir, "brands", `${key}.webp`);
	if (fs.existsSync(dest) && fs.statSync(dest).size > 400) {
		console.log("skip logo", key);
		return true;
	}
	const urls = [
		`https://logo.clearbit.com/${domain}?size=128`,
		`https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
	];
	for (const url of urls) {
		try {
			const buf = await download(url);
			if (!buf || buf.length < 200) continue;
			await s(buf)
				.resize(160, 80, {
					fit: "contain",
					background: { r: 255, g: 255, b: 255, alpha: 0 },
				})
				.webp({ quality: 90 })
				.toFile(dest);
			console.log("logo", key);
			return true;
		} catch {
			// next
		}
	}
	console.log("fail logo", key);
	return false;
}

async function saveCat(s, slug, url, folder) {
	const dir = path.join(imgDir, folder);
	fs.mkdirSync(dir, { recursive: true });
	const dest = path.join(dir, `${slug}.webp`);
	if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
		console.log("skip img", folder, slug);
		return `/images/${folder}/${slug}.webp`;
	}
	try {
		const buf = await download(url);
		await s(buf)
			.resize(960, 540, { fit: "cover", position: "attention" })
			.webp({ quality: 82 })
			.toFile(dest);
		console.log("img", folder, slug);
		return `/images/${folder}/${slug}.webp`;
	} catch (e) {
		console.log("fail img", slug, e.message);
		return null;
	}
}

async function main() {
	const s = sharp();
	const entries = Object.entries(remainingLogos);
	for (let i = 0; i < entries.length; i++) {
		const [key, domain] = entries[i];
		await saveLogo(s, key, domain);
	}

	const ictMap = {};
	for (const [slug, url] of Object.entries(ICT_IMAGES)) {
		ictMap[slug] = await saveCat(s, slug, url, "ict-products");
	}
	const dcMap = {};
	for (const [slug, url] of Object.entries(DC_IMAGES)) {
		dcMap[slug] = await saveCat(s, slug, url, "data-center");
	}

	// patch JSON img paths where downloads succeeded
	const hwPath = path.join(root, "public", "fakedata", "home-work.json");
	const dcPath = path.join(root, "public", "fakedata", "data-center.json");
	const hw = JSON.parse(fs.readFileSync(hwPath, "utf8"));
	const dc = JSON.parse(fs.readFileSync(dcPath, "utf8"));
	for (const g of hw) {
		if (ictMap[g.slug]) g.img = ictMap[g.slug];
	}
	for (const g of dc) {
		if (dcMap[g.slug]) g.img = dcMap[g.slug];
	}
	fs.writeFileSync(hwPath, JSON.stringify(hw, null, "\t") + "\n");
	fs.writeFileSync(dcPath, JSON.stringify(dc, null, "\t") + "\n");
	console.log("done images + json img paths");
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
