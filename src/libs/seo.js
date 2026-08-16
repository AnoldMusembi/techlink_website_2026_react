const SITE_URL = "https://techlinklimited.co.ke";

export const siteConfig = {
	name: "Techlink Limited",
	url: SITE_URL,
	locale: "en_KE",
	ogImage: "/images/og-image.webp",
	phone: "+254 777 434 354",
	email: "info@techlinklimited.co.ke",
	address: "Tulip Tower, Floor #01, Mpaka Rd, Westlands, Nairobi, Kenya",
};

export const defaultKeywords = [
	"Techlink Limited",
	"ICT Kenya",
	"ICT Nairobi",
	"IT support Westlands",
	"data centre Kenya",
	"cloud services Kenya",
	"cybersecurity Kenya",
	"network installation Nairobi",
	"Microsoft partner Kenya",
	"genuine software licenses",
	"enterprise servers Kenya",
	"home and office computers Kenya",
];

export function pageMetadata({
	title,
	description,
	path = "/",
	keywords = [],
	index = true,
}) {
	const url = new URL(path, SITE_URL).toString();
	const fullTitle = title;
	const ogTitle =
		typeof title === "string" && title.includes(siteConfig.name)
			? title
			: `${title} | ${siteConfig.name}`;
	const imageUrl = new URL(siteConfig.ogImage, SITE_URL).toString();
	const keywordList = [...new Set([...keywords, ...defaultKeywords])];

	return {
		title: fullTitle,
		description,
		keywords: keywordList,
		alternates: { canonical: url },
		robots: index
			? { index: true, follow: true }
			: { index: false, follow: false },
		openGraph: {
			type: "website",
			locale: siteConfig.locale,
			url,
			siteName: siteConfig.name,
			title: ogTitle,
			description,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: siteConfig.name,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: ogTitle,
			description,
			images: [imageUrl],
		},
	};
}
