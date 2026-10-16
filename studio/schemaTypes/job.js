import { defineType, defineField } from "sanity";

export const job = defineType({
	name: "job",
	title: "Job Opening",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Job title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title", maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "active",
			title: "Published (show on website)",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "string",
			options: {
				list: [
					{ title: "Technical", value: "Technical" },
					{ title: "Sales", value: "Sales" },
					{ title: "Operations", value: "Operations" },
					{ title: "Support", value: "Support" },
					{ title: "Internship", value: "Internship" },
					{ title: "Other", value: "Other" },
				],
			},
			initialValue: "Technical",
		}),
		defineField({
			name: "employmentType",
			title: "Employment type",
			type: "string",
			options: {
				list: [
					{ title: "Full-time", value: "Full-time" },
					{ title: "Part-time", value: "Part-time" },
					{ title: "Contract", value: "Contract" },
					{ title: "Internship", value: "Internship" },
				],
			},
			initialValue: "Full-time",
		}),
		defineField({
			name: "location",
			title: "Location",
			type: "string",
			initialValue: "Nairobi, Kenya",
		}),
		defineField({
			name: "salary",
			title: "Salary / package label",
			type: "string",
			description: 'Example: "Competitive" or "KES 80,000 – 120,000"',
			initialValue: "Competitive",
		}),
		defineField({
			name: "salaryPeriod",
			title: "Salary period label",
			type: "string",
			description: 'Shown after salary, e.g. "month"',
			initialValue: "month",
		}),
		defineField({
			name: "iconName",
			title: "Icon class",
			type: "string",
			description: "Site icon class, e.g. tji-service-2",
			initialValue: "tji-service-1",
		}),
		defineField({
			name: "shortDescription",
			title: "Short description",
			type: "text",
			rows: 3,
			validation: (Rule) => Rule.required().max(280),
		}),
		defineField({
			name: "description",
			title: "Full job description",
			type: "array",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "requirements",
			title: "Requirements",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "responsibilities",
			title: "Responsibilities",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "vacancies",
			title: "Number of vacancies",
			type: "number",
			initialValue: 1,
		}),
		defineField({
			name: "applyEmail",
			title: "Application email",
			type: "string",
			initialValue: "info@techlinklimited.co.ke",
		}),
		defineField({
			name: "publishedAt",
			title: "Published date",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "location",
			active: "active",
		},
		prepare({ title, subtitle, active }) {
			return {
				title: title || "Untitled role",
				subtitle: `${active === false ? "Hidden · " : ""}${subtitle || ""}`,
			};
		},
	},
});
