import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import CategoryDetailsPrimary from "@/components/sections/solutions/CategoryDetailsPrimary";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getHomeWorkGroups from "@/libs/getHomeWorkGroups";
import { pageMetadata } from "@/libs/seo";
import { notFound } from "next/navigation";

const groups = getHomeWorkGroups();

export async function generateStaticParams() {
	return (groups || []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const item = groups?.find((g) => g.slug === slug);
	if (!item) {
		return pageMetadata({
			title: "ICT Products",
			description: "ICT products from Techlink Limited.",
			path: `/ict-products/${slug}`,
			index: false,
		});
	}
	return pageMetadata({
		title: item.title,
		description: item.desc,
		path: item.path,
		keywords: [
			item.title,
			"ICT products Kenya",
			"Techlink Limited",
			...(item.brands || []).map((b) => b.name).slice(0, 6),
		],
	});
}

export default async function IctProductCategory({ params }) {
	const { slug } = await params;
	const group = groups?.find((g) => g.slug === slug);
	if (!group) {
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
							title={group.title}
							text={group.title}
							breadcrums={[
								{ name: "ICT Products", path: "/ict-products" },
							]}
						/>
						<CategoryDetailsPrimary
							group={group}
							parentLabel="ICT Products"
							parentPath="/ict-products"
							siblings={groups}
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
