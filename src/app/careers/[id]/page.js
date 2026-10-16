import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import CareerDetails1 from "@/components/sections/careers/CareerDetails1";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getCareers from "@/libs/getCareers";
import { pageMetadata } from "@/libs/seo";
import { notFound } from "next/navigation";

const items = getCareers();

export async function generateStaticParams() {
	return (items || []).map(({ id }) => ({ id: id.toString() }));
}

export async function generateMetadata({ params }) {
	const { id } = await params;
	const item = items?.find(({ id: id1 }) => id1 === parseInt(id, 10));
	if (!item) {
		return pageMetadata({
			title: "Career role",
			description: "Job opening at Techlink Limited.",
			path: `/careers/${id}`,
			index: false,
		});
	}
	return pageMetadata({
		title: item.title,
		description:
			item.desc ||
			`${item.title} — ${item.location || "Nairobi"} role at Techlink Limited.`,
		path: `/careers/${item.id}`,
		keywords: [
			item.title,
			"Techlink careers",
			"ICT jobs Nairobi",
			item.category,
		].filter(Boolean),
	});
}

export default async function CareerDetails({ params }) {
	const { id } = await params;
	const item = items?.find(({ id: id1 }) => id1 === parseInt(id, 10));
	if (!item) {
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
						<HeroInner
							title={item.title}
							text={item.title}
							breadcrums={[{ name: "Careers", path: "/careers" }]}
						/>
						<CareerDetails1 currentItemId={parseInt(id, 10)} />
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
