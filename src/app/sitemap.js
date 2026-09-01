import getALlServices from "@/libs/getALlServices";
import getBlogs from "@/libs/getBlogs";
import { siteConfig } from "@/libs/seo";

export const dynamic = "force-static";

export default function sitemap() {
	const now = new Date();
	const pages = [
		{ path: "/", priority: 1, changeFrequency: "weekly" },
		{ path: "/about", priority: 0.8, changeFrequency: "monthly" },
		{ path: "/services", priority: 0.9, changeFrequency: "weekly" },
		{ path: "/data-center", priority: 0.8, changeFrequency: "monthly" },
		{ path: "/ict-products", priority: 0.8, changeFrequency: "monthly" },
		{ path: "/blogs", priority: 0.6, changeFrequency: "weekly" },
		{ path: "/careers", priority: 0.5, changeFrequency: "weekly" },
		{ path: "/contact", priority: 0.7, changeFrequency: "monthly" },
	];

	const services = (getALlServices() || []).map(item => ({
		path: `/services/${item.id}`,
		priority: 0.7,
		changeFrequency: "monthly",
	}));

	const blogs = (getBlogs() || []).slice(0, 3).map(item => ({
		path: `/blogs/${item.id}`,
		priority: 0.5,
		changeFrequency: "monthly",
	}));

	return [...pages, ...services, ...blogs].map(item => ({
		url: `${siteConfig.url}${item.path}`,
		lastModified: now,
		changeFrequency: item.changeFrequency,
		priority: item.priority,
	}));
}
