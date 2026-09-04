import SolutionBrandLogos, {
	splitItem,
} from "@/components/sections/solutions/SolutionBrandLogos";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";

const CategoryDetailsPrimary = ({
	group,
	parentLabel,
	parentPath,
	siblings = [],
}) => {
	const { title, desc, items = [], brands = [], img, slug } = group || {};
	const currentIndex = siblings.findIndex((g) => g.slug === slug);
	const prev = currentIndex > 0 ? siblings[currentIndex - 1] : null;
	const next =
		currentIndex >= 0 && currentIndex < siblings.length - 1
			? siblings[currentIndex + 1]
			: null;

	return (
		<section className="tj-blog-section section-gap solution-category-details">
			<div className="container">
				<div className="row row-gap-4">
					<div className="col-lg-8">
						<div className="post-details-wrapper">
							{img ? (
								<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
									<Image
										src={img}
										alt={title || "Category"}
										width={870}
										height={450}
										style={{ height: "auto", width: "100%" }}
										unoptimized
									/>
								</div>
							) : null}
							<h2 className="title title-anim">{title}</h2>
							<p className="wow fadeInUp" data-wow-delay=".2s">
								{desc}
							</p>
							{items.length ? (
								<>
									<h3 className="wow fadeInUp" data-wow-delay=".25s">
										What we supply
									</h3>
									<ul className="solution-list solution-list-detail wow fadeInUp" data-wow-delay=".3s">
										{items.map((item, idx) => {
											const { label, detail } = splitItem(item);
											return (
												<li key={idx}>
													<i className="tji-check"></i>
													<span>
														{detail ? (
															<>
																<strong>{label}</strong>
																{detail}
															</>
														) : (
															label
														)}
													</span>
												</li>
											);
										})}
									</ul>
								</>
							) : null}
							<SolutionBrandLogos brands={brands} />
							<div className="solution-detail-cta wow fadeInUp" data-wow-delay=".35s">
								<p>
									Need sizing, quotes, or installation support for{" "}
									<strong>{title}</strong>? Our team can help.
								</p>
								<ButtonPrimary text="Contact us" url="/contact" />
							</div>
							{(prev || next) && (
								<div className="tj-post__navigation">
									{prev ? (
										<div className="tj-nav-previous">
											<span>Previous</span>
											<Link href={prev.path}>{prev.title}</Link>
										</div>
									) : (
										<span />
									)}
									{next ? (
										<div className="tj-nav-next">
											<span>Next</span>
											<Link href={next.path}>{next.title}</Link>
										</div>
									) : null}
								</div>
							)}
						</div>
					</div>
					<div className="col-lg-4">
						<aside className="tj-main-sidebar">
							<div className="tj-sidebar-widget wow fadeInUp" data-wow-delay=".2s">
								<h4 className="widget-title">More in {parentLabel}</h4>
								<ul className="solution-sidebar-list">
									{siblings.map((item) => (
										<li
											key={item.slug}
											className={item.slug === slug ? "is-active" : ""}
										>
											<Link href={item.path}>{item.title}</Link>
										</li>
									))}
								</ul>
								<div className="solution-sidebar-back">
									<Link href={parentPath}>← Back to {parentLabel}</Link>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CategoryDetailsPrimary;
