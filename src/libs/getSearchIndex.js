import getALlServices from "@/libs/getALlServices";
import getDataCenterGroups from "@/libs/getDataCenterGroups";
import getHomeWorkGroups from "@/libs/getHomeWorkGroups";

const pages = [
	{
		title: "Home",
		path: "/",
		type: "Page",
		text: "Techlink Limited ICT Kenya Nairobi genuine products data centre cloud IT support",
	},
	{
		title: "About us",
		path: "/about",
		type: "Page",
		text: "About Techlink Limited founded 2012 Kenyan-owned ICT company Westlands Nairobi",
	},
	{
		title: "ICT Services",
		path: "/services",
		type: "Page",
		text: "ICT services installation network cybersecurity cloud support consulting",
	},
	{
		title: "Data Center Solutions",
		path: "/data-center",
		type: "Page",
		text: "Data centre servers storage backup racks cooling power HPE Dell Lenovo",
	},
	{
		title: "ICT Products",
		path: "/ict-products",
		type: "Page",
		text: "Laptops desktops printers home office workplace computers HP Dell Lenovo ICT products",
	},
	{
		title: "Careers",
		path: "/careers",
		type: "Page",
		text: "Careers jobs openings CV vacancies Techlink team",
	},
	{
		title: "Contact us",
		path: "/contact",
		type: "Page",
		text: "Contact Techlink Tulip Tower Mpaka Road Westlands Nairobi phone email",
	},
];

const getSearchIndex = () => {
	const services = (getALlServices() || []).map(item => ({
		title: item.shortTitle || item.title,
		path: `/services/${item.id}`,
		type: "Service",
		text: `${item.title} ${item.shortDesc || ""} ${item.desc || ""} ${item.desc1 || ""}`,
	}));

	const dataCenter = (getDataCenterGroups() || []).map(item => ({
		title: item.title,
		path: "/data-center",
		type: "Data Center",
		text: `${item.title} ${item.desc || ""} ${(item.items || []).join(" ")} ${item.brands || ""}`,
	}));

	const homeWork = (getHomeWorkGroups() || []).map(item => ({
		title: item.title,
		path: "/ict-products",
		type: "ICT Products",
		text: `${item.title} ${item.desc || ""} ${(item.items || []).join(" ")} ${item.brands || ""}`,
	}));

	return [...pages, ...services, ...dataCenter, ...homeWork];
};

export const searchSite = query => {
	const term = query.trim().toLowerCase();
	if (term.length < 2) {
		return [];
	}
	return getSearchIndex()
		.map(item => {
			const haystack = `${item.title} ${item.text} ${item.type}`.toLowerCase();
			const score =
				(item.title.toLowerCase().includes(term) ? 3 : 0) +
				(haystack.includes(term) ? 1 : 0);
			return { ...item, score };
		})
		.filter(item => item.score > 0)
		.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
		.slice(0, 8);
};

export default getSearchIndex;
