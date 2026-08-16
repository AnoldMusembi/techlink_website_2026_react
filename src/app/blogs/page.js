import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import BlogMain from "@/components/layout/main/BlogMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/libs/seo";
import { Suspense } from "react";

export const metadata = pageMetadata({
	title: "Insights & Ideas",
	description:
		"Practical ICT insights from Techlink Limited — networks, cybersecurity, cloud, and technology for Kenyan businesses.",
	path: "/blogs",
	keywords: [
		"ICT insights Kenya",
		"IT tips Nairobi",
		"cybersecurity advice Kenya",
		"Techlink blog",
	],
});

export default function Blogs() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<Suspense fallback={null}>
							<BlogMain />
						</Suspense>
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
