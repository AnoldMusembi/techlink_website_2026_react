import Image from "next/image";

const SolutionGroups = ({ groups = [] }) => {
	return (
		<section className="tj-service-section service-4 solution-groups section-gap">
			<div className="container">
				<div className="row row-gap-4">
					{groups.map((group, idx) => {
						const brands = group.brands
							? group.brands
									.split(",")
									.map((brand) => brand.trim())
									.filter(Boolean)
							: [];
						return (
							<div key={group.id || idx} className="col-lg-6">
								<div
									className="service-item style-4 solution-card wow fadeInUp"
									data-wow-delay={`${0.2 + (idx % 4) * 0.1}s`}
								>
									{group.img ? (
										<div className="service-img">
											<Image
												src={group.img}
												alt={group.title}
												width={640}
												height={280}
											/>
										</div>
									) : (
										""
									)}
									<div className="service-content">
										<h4 className="title">{group.title}</h4>
										<p className="desc">{group.desc}</p>
										{group.items?.length ? (
											<ul className="solution-list">
												{group.items.map((item, itemIdx) => {
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
										) : (
											""
										)}
										{brands.length ? (
											<div className="solution-brands">
												<span className="solution-brands-label">
													Brands we supply
												</span>
												<div className="solution-brand-tags">
													{brands.map((brand) => (
														<span key={brand} className="solution-brand-tag">
															{brand}
														</span>
													))}
												</div>
											</div>
										) : (
											""
										)}
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

const splitItem = (item) => {
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

export default SolutionGroups;
