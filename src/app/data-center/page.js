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
import getDataCenterGroups from "@/libs/getDataCenterGroups";

import { pageMetadata } from "@/libs/seo";

export const metadata = pageMetadata({
	title: "Data Center Solutions",
	description:
		"Enterprise servers, storage, backup, networking, and datacentre infrastructure from trusted brands. Designed, supplied, and supported by Techlink Limited.",
	path: "/data-center",
	keywords: [
		"data centre Kenya",
		"enterprise servers Nairobi",
		"storage solutions Kenya",
		"HPE Dell Lenovo Kenya",
		"server room setup Nairobi",
	],
});

export default function DataCenter() {
	const groups = getDataCenterGroups();
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<HeroInner
							title={"Data Center Solutions"}
							text={"Data Center Solutions"}
						/>
						<PageIntro
							subtitle="Reliability you can build on"
							title="Powering the world’s digital backbone. Built for uptime. Designed for"
							highlight="scale."
							image="/images/service/service-3.webp"
							imageAlt="Data centre infrastructure"
						>
							<p>
								Our data center solutions are designed to support mission-critical
								workloads with uncompromising reliability, security, and
								performance. From scalable infrastructure to intelligent power
								and cooling, we help organizations build resilient environments
								that keep systems running, data protected, and operations
								future-ready.
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
