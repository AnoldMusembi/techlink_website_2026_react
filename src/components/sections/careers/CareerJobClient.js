"use client";

import CareerDetailsClient from "@/components/sections/careers/CareerDetailsClient";
import HeroInner from "@/components/sections/hero/HeroInner";
import { useSearchParams } from "next/navigation";

const CareerJobClient = () => {
	const searchParams = useSearchParams();
	const slug = searchParams.get("slug") || "";

	return (
		<>
			<HeroInner
				title={slug ? "Role details" : "Careers"}
				text={slug ? "Role details" : "Careers"}
				breadcrums={[{ name: "Careers", path: "/careers" }]}
			/>
			<CareerDetailsClient slug={slug} />
		</>
	);
};

export default CareerJobClient;
