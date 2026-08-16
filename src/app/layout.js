import { Poppins } from "next/font/google";
import "react-range-slider-input/dist/style.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./assets/css/animate.min.css";
import "./assets/css/bexon-icons.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome-pro.min.css";
import "./assets/css/glightbox.min.css";
import "./assets/css/meanmenu.css";
import "./assets/css/nice-select2.css";
import "./assets/css/odometer-theme-default.css";
import "./globals.scss";
import { pageMetadata, siteConfig } from "@/libs/seo";

const bodyFont = Poppins({
	variable: "--tj-ff-body",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});
const headingFont = Poppins({
	variable: "--tj-ff-heading",
	subsets: ["latin"],
	weight: ["600", "700", "800"],
	display: "swap",
});

const homeMeta = pageMetadata({
	title: "Techlink Limited | End-to-End ICT Solutions in Kenya",
	description:
		"Kenyan-owned ICT company established in 2012. Genuine products, data centre, cloud, cybersecurity, and IT support for homes and businesses in Nairobi and across Kenya.",
	path: "/",
	keywords: [
		"ICT solutions Kenya",
		"IT company Nairobi",
		"value added reseller Kenya",
		"systems integrator Nairobi",
	],
});

export const metadata = {
	metadataBase: new URL(siteConfig.url),
	...homeMeta,
	title: {
		default: homeMeta.title,
		template: "%s | Techlink Limited",
	},
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	creator: siteConfig.name,
	publisher: siteConfig.name,
	category: "Information Technology",
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: siteConfig.name,
	url: siteConfig.url,
	logo: `${siteConfig.url}/images/logos/logo.webp`,
	email: siteConfig.email,
	telephone: siteConfig.phone,
	address: {
		"@type": "PostalAddress",
		streetAddress: "Tulip Tower, Floor #01, Mpaka Rd, Westlands",
		addressLocality: "Nairobi",
		addressCountry: "KE",
	},
	areaServed: "Kenya",
	foundingDate: "2012",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			dir="ltr"
			data-scroll-behavior="smooth"
			suppressHydrationWarning
		>
			<body
				className={`${bodyFont.variable} ${headingFont.variable}`}
				suppressHydrationWarning
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				{children}
			</body>
		</html>
	);
}
