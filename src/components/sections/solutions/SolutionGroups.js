import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import SolutionBrandLogos, { splitItem } from "./SolutionBrandLogos";

const SolutionGroups = ({ groups = [], previewItems = 4 }) => {
	return (
		<section className="tj-service-section service-4 solution-groups section-gap">
			<div className="container">
				<div className="row row-gap-4">
					{groups.map((group, idx) => {
						const href = group.path || null;
						const preview = (group.items || []).slice(0, previewItems);
						const moreCount = Math.max(
							0,
							(group.items || []).length - preview.length
						);
						return (
							<div key={group.id || idx} className="col-lg-6">
								<div
									className="service-item style-4 solution-card wow fadeInUp"
									data-wow-delay={`${0.2 + (idx % 4) * 0.1}s`}
								>
									{group.img ? (
										<div className="service-img">
											{href ? (
												<Link href={href}>
													<Image
														src={group.img}
														alt={group.title}
														width={640}
														height={280}
														unoptimized
													/>
												</Link>
											) : (
												<Image
													src={group.img}
													alt={group.title}
													width={640}
													height={280}
													unoptimized
												/>
											)}
										</div>
									) : null}
									<div className="service-content">
										<h4 className="title">
											{href ? <Link href={href}>{group.title}</Link> : group.title}
										</h4>
										<p className="desc">{group.desc}</p>
										{preview.length ? (
											<ul className="solution-list">
												{preview.map((item, itemIdx) => {
													const { label, detail } = splitItem(item);
													return (
														<li key={itemIdx}>
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
										) : null}
										{moreCount > 0 ? (
											<p className="solution-more-count">
												+{moreCount} more product
												{moreCount === 1 ? "" : "s"}
											</p>
										) : null}
										<SolutionBrandLogos brands={group.brands} compact />
										{href ? (
											<div className="solution-read-more">
												<ButtonPrimary text="Read more" url={href} />
											</div>
										) : null}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default SolutionGroups;
