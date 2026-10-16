import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
	console.warn(
		"[studio] Missing SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID. Create studio/.env with your project id."
	);
}

export default defineConfig({
	name: "techlink-careers",
	title: "Techlink Careers",
	projectId: projectId || "placeholder",
	dataset,
	plugins: [structureTool(), visionTool()],
	schema: {
		types: schemaTypes,
	},
});
