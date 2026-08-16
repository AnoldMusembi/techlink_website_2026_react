import { notFound } from "next/navigation";

export const removedMetadata = {
	title: "Page not found",
	robots: { index: false, follow: false },
};

export default function RemovedDemoPage() {
	notFound();
}
