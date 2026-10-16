import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import CareerJobClient from "@/components/sections/careers/CareerJobClient";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import { pageMetadata } from "@/libs/seo";
import { Suspense } from "react";

export const metadata = pageMetadata({
	title: "Job opening",
	description: "View a career opportunity at Techlink Limited.",
	path: "/careers/job",
	keywords: ["Techlink careers", "ICT jobs Nairobi"],
});

export default function CareerJobPage() {
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<Suspense
							fallback={
								<section className="tj-careers-details section-gap">
									<div className="container">
										<div className="careers-empty">
											<p>Loading role details…</p>
										</div>
									</div>
								</section>
							}
						>
							<CareerJobClient />
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
