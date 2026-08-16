"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";
import CtaSidebar from "../cta/CtaSidebar";

const ServicesDetailsPrimary = ({ option }) => {
	const {
		currentItem,
		items,
		currentId,
		isPrevItem,
		isNextItem,
		prevId,
		nextId,
	} = option || {};
	const { title, titleLarge, desc, desc1, desc2, img, img2, img3, process } =
		currentItem || {};
	const processItems = process?.processItems || [];
	const sidebarItems = items;

	return (
		<section className="tj-service-area section-gap">
			<div className="container">
				<div className="row row-gap-5">
					<div className="col-lg-8">
						<div className="post-details-wrapper">
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								<Image
									src={img ? img : "/images/service/detail-1.webp"}
									alt={title ? title : "Service"}
									width={870}
									height={450}
									unoptimized
								/>
							</div>
							<h2 className="title title-anim">
								{titleLarge ? titleLarge : title}
							</h2>
							<div className="blog-text">
								<p className="wow fadeInUp" data-wow-delay=".3s">
									{desc1 ? desc1 : desc}
								</p>
								{desc2 ? (
									<p className="wow fadeInUp" data-wow-delay=".3s">
										{desc2}
									</p>
								) : (
									""
								)}
								{processItems.length ? (
									<ul className="wow fadeInUp" data-wow-delay=".3s">
										{processItems.map((item, idx) => (
											<li key={idx}>
												<span>
													<i className="tji-check"></i>
												</span>
												{item}
											</li>
										))}
									</ul>
								) : (
									""
								)}
								<div className="images-wrap">
									<div className="row">
										<div className="col-sm-6">
											<div
												className="image-box wow fadeInUp"
												data-wow-delay=".3s"
											>
												<Image
													src={img2 ? img2 : "/images/service/detail-1b.webp"}
													alt=""
													width={420}
													height={450}
													unoptimized
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div
												className="image-box wow fadeInUp"
												data-wow-delay=".5s"
											>
												<Image
													src={img3 ? img3 : "/images/service/detail-1c.webp"}
													alt=""
													width={420}
													height={450}
													unoptimized
												/>
											</div>
										</div>
									</div>
								</div>
								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Talk to Techlink
								</h3>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									We take time to understand your business needs, then tailor
									solutions that improve efficiency, security, and performance.
									Reach out for a practical assessment of this service and how
									it fits your site, budget, and timeline.
								</p>
								<BootstrapWrapper>
									<div className="accordion tj-faq style-2" id="faqOne">
										<div
											className="accordion-item active wow fadeInUp"
											data-wow-delay=".3s"
										>
											<button
												className=" faq-title"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq-1"
												aria-expanded="true"
											>
												How do we get started?
											</button>
											<div
												id="faq-1"
												className="collapse show"
												data-bs-parent="#faqOne"
											>
												<div className="accordion-body faq-text">
													<p>
														Contact us with your site, user count, and timeline.
														We survey or assess as needed, then recommend
														genuine products and a deployment plan. Typical
														reply is within a couple of hours, and no more than
														two working days.
													</p>
												</div>
											</div>
										</div>
										<div
											className="accordion-item wow fadeInUp"
											data-wow-delay=".3s"
										>
											<button
												className="faq-title collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq-2"
												aria-expanded="false"
											>
												Do you supply and install?
											</button>
											<div
												id="faq-2"
												className="collapse"
												data-bs-parent="#faqOne"
											>
												<div className="accordion-body faq-text">
													<p>
														Yes. As a value-added reseller we supply authentic
														products from trusted brands and can install,
														configure, and support them. You can also buy supply
														only if you have your own technical team.
													</p>
												</div>
											</div>
										</div>
										<div
											className="accordion-item wow fadeInUp"
											data-wow-delay=".3s"
										>
											<button
												className="faq-title collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#faq-3"
												aria-expanded="false"
											>
												Where are you based?
											</button>
											<div
												id="faq-3"
												className="collapse"
												data-bs-parent="#faqOne"
											>
												<div className="accordion-body faq-text">
													<p>
														Tulip Tower, Floor #01, Mpaka Road, Westlands,
														Nairobi. We serve clients across Kenya, Monday to
														Saturday, 8:00 AM – 6:00 PM, with online support
														24/7.
													</p>
												</div>
											</div>
										</div>
									</div>
								</BootstrapWrapper>
							</div>
							<div
								className="tj-post__navigation mb-0 wow fadeInUp"
								data-wow-delay="0.3s"
							>
								<div
									className="tj-nav__post previous"
									style={{ visibility: isPrevItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav prev_post">
										<Link href={isPrevItem ? `/services/${prevId}` : "#"}>
											<span>
												<i className="tji-arrow-left"></i>
											</span>
											Previous
										</Link>
									</div>
								</div>
								<Link href={"/services"} className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								<div
									className="tj-nav__post next"
									style={{ visibility: isNextItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav next_post">
										<Link href={isNextItem ? `/services/${nextId}` : "#"}>
											Next
											<span>
												<i className="tji-arrow-right"></i>
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<aside className="tj-main-sidebar">
							<div
								className="tj-sidebar-widget service-categories wow fadeInUp"
								data-wow-delay=".1s"
							>
								<h4 className="widget-title">More Services</h4>
								<ul>
									{sidebarItems?.length
										? sidebarItems?.map(({ shortTitle, title, id }, idx) => (
												<li key={idx}>
													<Link
														className={`${currentId === id ? "active" : ""}`}
														href={`/services/${id}`}
													>
														{shortTitle ? shortTitle : title}
														<span className="icon">
															<i className="tji-arrow-right"></i>
														</span>
													</Link>
												</li>
										  ))
										: ""}
								</ul>
							</div>
							<div
								className="tj-sidebar-widget widget-feature-item wow fadeInUp"
								data-wow-delay=".3s"
							>
								<CtaSidebar />
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ServicesDetailsPrimary;
