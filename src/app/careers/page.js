import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Careers1 from "@/components/sections/careers/Careers1";
import CareersIntro from "@/components/sections/careers/CareersIntro";
import Contact2 from "@/components/sections/contacts/Contact2";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/libs/seo";

export const metadata = pageMetadata({
	title: "Careers",
	description:
		"Explore careers at Techlink Limited in Nairobi. Join our ICT team for networking, cloud, cybersecurity, and enterprise technology roles across Kenya.",
	path: "/careers",
	keywords: [
		"Techlink careers",
		"ICT jobs Nairobi",
		"IT jobs Kenya",
		"Techlink Limited jobs",
	],
});

export default function Careers() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"Careers"} text={"Careers"} />
						<CareersIntro />
						<Careers1 />
						<Contact2 />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
