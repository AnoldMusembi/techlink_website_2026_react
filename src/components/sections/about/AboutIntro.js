import Image from "next/image";

const AboutIntro = () => {
	return (
		<section className="tj-about-section section-gap">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-xl-6 col-lg-6">
						<div className="about-img-area wow fadeInLeft" data-wow-delay=".2s">
							<div className="about-img overflow-hidden">
								<Image
									data-speed="0.8"
									src="/images/about/techlink-about.webp"
									alt="Techlink Limited"
									width={653}
									height={675}
								/>
							</div>
							<div className="box-area">
								<div
									className="experience-box wow fadeInUp"
									data-wow-delay=".3s"
								>
									<span className="sub-title">Our journey</span>
									<div className="customers-number">14</div>
									<h6 className="customers-text">
										Years of learning and service
									</h6>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6">
						<div className="about-content-area style-1">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Our journey
								</span>
								<h2 className="sec-title title-anim">
									Let’s get to know each other, know what drives us, and
									hopefully you could be part of our <span>story.</span>
								</h2>
							</div>
							<p className="wow fadeInUp" data-wow-delay=".5s">
								Techlink Limited is a Kenyan-owned ICT company established in
								2012. We help businesses and individuals access reliable
								technology, from everyday devices and office tools to advanced
								data centre and cloud solutions. As a value-added reseller, we
								combine genuine products, smart solutions, and friendly support
								to make technology simpler, safer, and more productive.
							</p>
							<p className="wow fadeInUp" data-wow-delay=".6s">
								We serve a diverse client base across multiple industries and
								are powered by strong partnerships with leading global
								technology brands. Our focus is on customer experience, fast
								turnaround, and end-to-end support, from product selection and
								solution design to deployment and after-sales service.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutIntro;
