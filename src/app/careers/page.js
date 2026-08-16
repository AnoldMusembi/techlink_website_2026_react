import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Careers1 from "@/components/sections/careers/Careers1";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";

import { pageMetadata } from "@/libs/seo";

export const metadata = pageMetadata({
	title: "Careers",
	description:
		"Current job openings at Techlink Limited. There are no open roles at the moment. You are welcome to send your CV for future consideration.",
	path: "/careers",
	keywords: ["Techlink careers", "ICT jobs Nairobi", "IT jobs Kenya"],
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
						<Careers1 />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
