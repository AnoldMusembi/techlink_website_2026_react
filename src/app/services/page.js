import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Brands1 from "@/components/sections/brands/Brands1";
import Contact2 from "@/components/sections/contacts/Contact2";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import ServicesIntro from "@/components/sections/services/ServicesIntro";
import ServicesPrimary from "@/components/sections/services/ServicesPrimary";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/libs/seo";

export const metadata = pageMetadata({
	title: "ICT Services",
	description:
		"ICT installation, network design, cybersecurity, cloud migration, IT support, consulting, datacentre setup, and software development from Techlink Limited in Nairobi.",
	path: "/services",
	keywords: [
		"ICT services Kenya",
		"network installation Nairobi",
		"IT support Kenya",
		"cloud migration Kenya",
		"cybersecurity services Nairobi",
	],
});

export default function Services() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"ICT Services"} text={"Services"} />
						<ServicesIntro />
						<ServicesPrimary />
						<Contact2 />
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
