import Image from "next/image";
import Link from "next/link";

const SolutionBrandLogos = ({ brands = [], compact = false }) => {
	const list = Array.isArray(brands)
		? brands
		: String(brands || "")
				.split(",")
				.map((name) => ({ name: name.trim() }))
				.filter((b) => b.name);

	if (!list.length) return null;

	return (
		<div className={`solution-brands${compact ? " is-compact" : ""}`}>
			<span className="solution-brands-label">Brands we supply</span>
			<div className="solution-brand-logos">
				{list.map((brand) => {
					const name = brand.name || brand;
					const logo = brand.logo;
					return logo ? (
						<span key={name} className="solution-brand-logo" title={name}>
							<Image
								src={logo}
								alt={name}
								width={compact ? 72 : 88}
								height={compact ? 36 : 44}
								unoptimized
							/>
						</span>
					) : (
						<span key={name} className="solution-brand-tag">
							{name}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default SolutionBrandLogos;

export const splitItem = (item) => {
	const separator = item.includes(" — ")
		? " — "
		: item.includes(" - ")
			? " - "
			: null;
	if (!separator) {
		return { label: item, detail: "" };
	}
	const [label, ...rest] = item.split(separator);
	return { label: label.trim(), detail: rest.join(separator).trim() };
};
