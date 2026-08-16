import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";

const AboutMission = () => {
	return (
		<section className="tj-about-section-2 about-drives section-gap section-gap-x">
			<div className="container">
				<div className="row align-items-stretch">
					<div className="col-xl-6 col-lg-6 order-lg-1 order-2 d-flex">
						<div
							className="about-img-area style-2 wow fadeInLeft"
							data-wow-delay=".3s"
						>
							<div className="about-img overflow-hidden" data-speed=".8">
								<Image
									src="/images/about/techlink-drives.webp"
									alt="Techlink Limited team collaborating"
									fill
									sizes="(max-width: 991px) 100vw, 50vw"
									unoptimized
								/>
							</div>
							<div className="box-area style-2">
								<div className="progress-box wow fadeInUp" data-wow-delay=".3s">
									<h4 className="title">Our progress</h4>
									<ul className="tj-progress-list">
										<li>
											<h6 className="tj-progress-title">Satisfaction</h6>
											<div className="tj-progress">
												<span className="tj-progress-percent">92%</span>
												<div
													className="tj-progress-bar"
													data-percent="92"
												></div>
											</div>
										</li>
										<li>
											<h6 className="tj-progress-title">Client rating</h6>
											<div className="tj-progress">
												<span className="tj-progress-percent">98%</span>
												<div
													className="tj-progress-bar"
													data-percent="98"
												></div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 order-lg-2 order-1">
						<div className="about-content-area">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>What drives us
								</span>
								<h2 className="sec-title title-anim">
									Helping people and businesses <span>thrive.</span>
								</h2>
							</div>
						</div>
						<div className="about-bottom-area">
							<div
								className="mission-vision-box wow fadeInLeft"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Mission</h4>
								<p className="desc">
									To deliver reliable, modern, and customer-centered technology
									solutions through genuine products, skilled expertise, and
									strong partnerships.
								</p>
								<ul className="list-items">
									<li>
										<i className="tji-list"></i>Integrity & accountability
									</li>
									<li>
										<i className="tji-list"></i>Customer-first delivery
									</li>
									<li>
										<i className="tji-list"></i>Practical innovation
									</li>
								</ul>
							</div>
							<div
								className="mission-vision-box wow fadeInRight"
								data-wow-delay=".5s"
							>
								<h4 className="title">Our Vision</h4>
								<p className="desc">
									To be a trusted and leading ICT solutions provider in the
									region and beyond, empowering people and businesses to thrive.
								</p>
								<ul className="list-items">
									<li>
										<i className="tji-list"></i>Regional leadership
									</li>
									<li>
										<i className="tji-list"></i>Dependable support
									</li>
									<li>
										<i className="tji-list"></i>Digital growth
									</li>
								</ul>
							</div>
						</div>
						<div className="about-btn-area wow fadeInUp" data-wow-delay=".5s">
							<ButtonPrimary text={"See our services"} url={"/services"} />
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</section>
	);
};

export default AboutMission;
