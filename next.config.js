/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	// Static HTML for cPanel public_html (Apache). Set STATIC_EXPORT=0 for Node hosting.
	output: process.env.STATIC_EXPORT === "0" ? undefined : "export",
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
