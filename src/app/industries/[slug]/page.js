import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import IndustryDetailsPrimary from "@/components/sections/about/IndustryDetailsPrimary";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getIndustries from "@/libs/getIndustries";
import { pageMetadata } from "@/libs/seo";
import { notFound } from "next/navigation";

const industries = getIndustries();

export async function generateStaticParams() {
	return (industries || []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const item = industries?.find((g) => g.slug === slug);
	if (!item) {
		return pageMetadata({
			title: "Industries",
			description: "Industries served by Techlink Limited.",
			path: `/industries/${slug}`,
			index: false,
		});
	}
	return pageMetadata({
		title: `${item.title} ICT Solutions`,
		description: item.overview || item.desc,
		path: item.path,
		keywords: [
			item.title,
			`${item.title} ICT Kenya`,
			"Techlink Limited",
			"ICT solutions Nairobi",
		],
	});
}

export default async function IndustryDetails({ params }) {
	const { slug } = await params;
	const industry = industries?.find((g) => g.slug === slug);
	if (!industry) {
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
							title={industry.title}
							text={industry.title}
							breadcrums={[{ name: "About us", path: "/about" }]}
						/>
						<IndustryDetailsPrimary
							industry={industry}
							siblings={industries}
						/>
						<Cta />
					</main>
					<Footer />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
}
