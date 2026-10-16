export const sanityConfig = {
	// Project IDs are public; keep a fallback so cPanel builds work even if the
	// GitHub secret is missing. Override with NEXT_PUBLIC_SANITY_PROJECT_ID when needed.
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "44sxzkv6",
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
};

export const isSanityConfigured = () =>
	Boolean(
		sanityConfig.projectId &&
			sanityConfig.projectId !== "yourProjectId" &&
			sanityConfig.projectId !== "placeholder"
	);

/**
 * Fetch GROQ results via Sanity HTTP API (no @sanity/client / rxjs).
 * Works cleanly with Next.js Turbopack and static export.
 */
export async function sanityFetch(query, params = {}) {
	if (!isSanityConfigured()) {
		throw new Error("Sanity is not configured");
	}

	const { projectId, dataset, apiVersion } = sanityConfig;
	const url = new URL(
		`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`
	);
	url.searchParams.set("query", query);

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(`$${key}`, JSON.stringify(value));
	}

	const res = await fetch(url.toString(), {
		headers: { Accept: "application/json" },
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Sanity query failed (${res.status}): ${text}`);
	}

	const json = await res.json();
	return json.result;
}
