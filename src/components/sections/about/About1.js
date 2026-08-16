import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Ratings1 from "@/components/shared/ratings/Ratings1";
import Image from "next/image";
const About1 = () => {
	return (
		<section className="tj-about-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-xl-6 col-lg-6 order-lg-1 order-2">
						<div
							className={`about-img-area wow fadeInLeft`}
							data-wow-delay=".2s"
						>
							<div className="about-img overflow-hidden">
								<Image
									data-speed="0.8"
									src="/images/about/techlink-about.webp"
									alt="Techlink Limited team"
									width={653}
									height={675}
									unoptimized
								/>
							</div>
							<div className="box-area">
								<div
									className="experience-box wow fadeInUp"
									data-wow-delay=".3s"
								>
									<span className="sub-title">Since 2012</span>
									<div className="customers-number">14+</div>
									<h6 className="customers-text">
										Years of learning and service
									</h6>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 order-lg-2 order-1">
						<div
							className={`about-content-area style-1 wow fadeInLeft`}
							data-wow-delay=".2s"
						>
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Techlink Limited
								</span>
								<h2 className="sec-title title-anim">
									14 years of learning and service for homes and{" "}
									<span>businesses.</span>
								</h2>
							</div>
							<div className="wow fadeInUp" data-wow-delay=".5s">
								<ButtonPrimary
									text={"Discover now"}
									url={"/about"}
									isTextBtn={true}
								/>
							</div>
						</div>
						<div className="about-bottom-area">
							<div
								className="client-review-cont wow fadeInUp"
								data-wow-delay=".7s"
							>
								<div className="rating-area">
									<Ratings1 />
								</div>
								<p className="desc">
									Techlink Limited is a Kenyan-owned ICT company established in
									2012. We help businesses and individuals access reliable
									technology, from everyday devices and office tools to advanced
									data centre and cloud solutions. As a value-added reseller, we
									combine genuine products, smart solutions, and friendly
									support to make technology simpler, safer, and more
									productive.
								</p>
								<div className="client-info-area">
									<div className="client-info">
										<h6 className="title">4.9 / 5.0</h6>
										<span className="designation">
											From 197 of 213 customers
										</span>
									</div>
									<span className="quote-icon">
										<i className="tji-quote"></i>
									</span>
								</div>
							</div>
							<div className="video-img  wow fadeInUp" data-wow-delay=".9s">
								<Image
									src="/images/about/techlink-about-sm.webp"
									alt="ICT professional at work"
									width={224}
									height={234}
									unoptimized
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About1;
