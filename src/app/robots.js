import { siteConfig } from "@/libs/seo";

export const dynamic = "force-static";

export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/shop",
				"/shop/",
				"/cart",
				"/wishlist",
				"/checkout",
				"/blog-grid",
				"/blog-sidebar",
				"/pricing-plan",
				"/team",
				"/team/",
				"/faq",
				"/home-02",
				"/home-03",
				"/home-04",
				"/home-05",
				"/home-06",
				"/home-07",
				"/home-08",
				"/home-09",
				"/home-10",
				"/login",
				"/password",
				"/portfolios",
				"/portfolios/",
				"/history",
				"/terms-and-conditions",
				"/careers/",
			],
		},
		sitemap: `${siteConfig.url}/sitemap.xml`,
		host: siteConfig.url,
	};
}
