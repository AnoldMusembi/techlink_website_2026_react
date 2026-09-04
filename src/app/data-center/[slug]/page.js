import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import CategoryDetailsPrimary from "@/components/sections/solutions/CategoryDetailsPrimary";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";
import getDataCenterGroups from "@/libs/getDataCenterGroups";
import { pageMetadata } from "@/libs/seo";
import { notFound } from "next/navigation";

const groups = getDataCenterGroups();

export async function generateStaticParams() {
	return (groups || []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const item = groups?.find((g) => g.slug === slug);
	if (!item) {
		return pageMetadata({
			title: "Data Center Solutions",
			description: "Data center solutions from Techlink Limited.",
			path: `/data-center/${slug}`,
			index: false,
		});
	}
	return pageMetadata({
		title: item.title,
		description: item.desc,
		path: item.path,
		keywords: [
			item.title,
			"data centre Kenya",
			"Techlink Limited",
			...(item.brands || []).map((b) => b.name).slice(0, 6),
		],
	});
}

export default async function DataCenterCategory({ params }) {
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
								{ name: "Data Center Solutions", path: "/data-center" },
							]}
						/>
						<CategoryDetailsPrimary
							group={group}
							parentLabel="Data Center Solutions"
							parentPath="/data-center"
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
