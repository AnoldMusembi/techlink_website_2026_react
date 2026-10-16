import localCareers from "../../public/fakedata/careers";
import { isSanityConfigured, sanityFetch } from "@/libs/sanity";

const jobsQuery = `*[_type == "job" && active != false] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  employmentType,
  location,
  salary,
  salaryPeriod,
  iconName,
  shortDescription,
  description,
  requirements,
  responsibilities,
  vacancies,
  applyEmail,
  publishedAt
}`;

const jobBySlugQuery = `*[_type == "job" && active != false && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  employmentType,
  location,
  salary,
  salaryPeriod,
  iconName,
  shortDescription,
  description,
  requirements,
  responsibilities,
  vacancies,
  applyEmail,
  publishedAt
}`;

export function mapSanityJob(job) {
	if (!job) return null;
	return {
		id: job._id,
		slug: job.slug,
		title: job.title,
		iconName: job.iconName || "tji-service-1",
		category: job.category || "Technical",
		need: job.employmentType || "Full-time",
		price: job.salary || "Competitive",
		duration: job.salaryPeriod || "month",
		location: job.location || "Nairobi, Kenya",
		desc: job.shortDescription || "",
		description: job.description || [],
		requirements: job.requirements || [],
		responsibilities: job.responsibilities || [],
		vacancies: job.vacancies || 1,
		applyEmail: job.applyEmail || "info@techlinklimited.co.ke",
		publishedAt: job.publishedAt || null,
		source: "sanity",
	};
}

function mapLocalJob(job) {
	return {
		...job,
		slug: job.slug || String(job.id),
		desc: job.desc || "",
		description: job.description || [],
		requirements: job.requirements || [],
		responsibilities: job.responsibilities || [],
		vacancies: job.vacancies || 1,
		applyEmail: job.applyEmail || "info@techlinklimited.co.ke",
		source: "local",
	};
}

/** Sync fallback used by older imports */
const getCareers = () => {
	return (localCareers || []).map(mapLocalJob);
};

export async function fetchCareers() {
	if (isSanityConfigured()) {
		try {
			const rows = await sanityFetch(jobsQuery);
			if (Array.isArray(rows)) {
				return rows.map(mapSanityJob).filter(Boolean);
			}
		} catch (error) {
			console.error("Sanity careers fetch failed, using local fallback.", error);
		}
	}
	return getCareers();
}

export async function fetchCareerBySlug(slug) {
	if (!slug) return null;

	if (isSanityConfigured()) {
		try {
			const row = await sanityFetch(jobBySlugQuery, { slug });
			if (row) return mapSanityJob(row);
		} catch (error) {
			console.error("Sanity career detail fetch failed.", error);
		}
	}

	const local = getCareers().find(
		(item) => item.slug === slug || String(item.id) === String(slug)
	);
	return local || null;
}

export default getCareers;
