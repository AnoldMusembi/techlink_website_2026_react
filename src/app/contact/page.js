import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Contact3 from "@/components/sections/contacts/Contact3";
import ContactTop from "@/components/sections/contacts/ContactTop";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/libs/seo";

export const metadata = pageMetadata({
	title: "Contact Us",
	description:
		"Visit Techlink Limited at Tulip Tower, Mpaka Road, Westlands, Nairobi. Call +254 777 434 354 or email info@techlinklimited.co.ke. Open Monday to Saturday, 8:00 AM – 6:00 PM.",
	path: "/contact",
	keywords: [
		"Techlink contact",
		"ICT company Westlands",
		"IT support Nairobi contact",
		"Tulip Tower Mpaka Road",
	],
});

export default function Contact() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"Contact Us"} text={"Contact Us"} />
						<ContactTop />
						<Contact3 />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
