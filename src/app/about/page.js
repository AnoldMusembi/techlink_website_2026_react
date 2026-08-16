import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import AboutIntro from "@/components/sections/about/AboutIntro";
import AboutMission from "@/components/sections/about/AboutMission";
import Brands1 from "@/components/sections/brands/Brands1";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import Industries from "@/components/sections/about/Industries";
import WhyTechlink from "@/components/sections/about/WhyTechlink";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";

import { pageMetadata } from "@/libs/seo";

export const metadata = pageMetadata({
	title: "About Us",
	description:
		"Techlink Limited is a Kenyan-owned ICT company established in 2012. Learn about our mission, vision, and how we help businesses thrive with genuine technology.",
	path: "/about",
	keywords: [
		"about Techlink Limited",
		"ICT company Nairobi",
		"Kenyan ICT company",
		"IT company Westlands",
	],
});

export default function About() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"About Us"} text={"About Us"} />
						<AboutIntro />
						<AboutMission />
						<Industries />
						<WhyTechlink />
						<Brands1 type={2} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
