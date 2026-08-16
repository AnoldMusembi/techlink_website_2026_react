import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import ServiceDetailsMain from "@/components/layout/main/ServiceDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getALlServices from "@/libs/getALlServices";
import { pageMetadata } from "@/libs/seo";
import { notFound } from "next/navigation";

const items = getALlServices();

export async function generateMetadata({ params }) {
	const { id } = await params;
	const item = items?.find(({ id: id1 }) => id1 === parseInt(id));
	if (!item) {
		return pageMetadata({
			title: "Service",
			description: "ICT services from Techlink Limited.",
			path: `/services/${id}`,
			index: false,
		});
	}
	return pageMetadata({
		title: item.title,
		description: item.desc1 || item.desc || item.shortDesc,
		path: `/services/${item.id}`,
		keywords: [
			item.title,
			item.shortTitle,
			"ICT services Kenya",
			"Techlink Limited",
		].filter(Boolean),
	});
}

export default async function ServiceDetails({ params }) {
	const { id } = await params;

	const isExistItem = items?.find(({ id: id1 }) => id1 === parseInt(id));
	if (!isExistItem) {
		notFound();
	}
	return (
		<div>
			<BackToTop />
			<Header />
			<Header isStickyHeader={true} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						<ServiceDetailsMain currentItemId={parseInt(id)} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>

			<ClientWrapper />
		</div>
	);
}
export async function generateStaticParams() {
	return items?.map(({ id }) => ({ id: id.toString() }));
}
