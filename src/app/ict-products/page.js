import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Brands1 from "@/components/sections/brands/Brands1";
import Contact2 from "@/components/sections/contacts/Contact2";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import PageIntro from "@/components/sections/shared/PageIntro";
import SolutionGroups from "@/components/sections/solutions/SolutionGroups";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getHomeWorkGroups from "@/libs/getHomeWorkGroups";

import { pageMetadata } from "@/libs/seo";

export const metadata = pageMetadata({
	title: "ICT Products",
	description:
		"Laptops, desktops, printers, networking, and office technology for homes and workplaces in Kenya. Genuine products with warranties and optional setup from Techlink Limited.",
	path: "/ict-products",
	keywords: [
		"buy laptops Kenya",
		"office computers Nairobi",
		"printers Kenya",
		"home office IT",
		"HP Dell Lenovo Nairobi",
		"ICT products Kenya",
	],
});

export default function IctProducts() {
	const groups = getHomeWorkGroups();
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner title={"ICT Products"} text={"ICT Products"} />
						<PageIntro
							subtitle="Reliability you can build on"
							title="Smart tech for home. Powerful tech for"
							highlight="work."
							image="/images/service/service-1.webp"
							imageAlt="Computing devices for home and work"
						>
							<p>
								At Techlink Limited, we supply high-quality IT products for both
								home users and workplaces, helping you stay connected,
								productive, and secure. Whether you are setting up a home
								office, upgrading workplace systems, or equipping a growing
								team, we offer reliable technology you can count on.
							</p>
							<p>
								Our range includes laptops and desktops, networking equipment,
								printers and accessories, peripherals, storage, and essential
								office technology from trusted brands. Beyond selling products,
								we provide expert advice, setup support, and compatible
								accessories so you are not just buying tech — you are investing
								in tools that last.
							</p>
						</PageIntro>
						<SolutionGroups groups={groups} />
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
