import Image from "next/image";

const PageIntro = ({ subtitle, title, highlight, image, imageAlt, children }) => {
	return (
		<section className="tj-about-section section-gap">
			<div className="container">
				<div className="row align-items-center">
					{image ? (
						<div className="col-lg-6">
							<div
								className="about-img-area wow fadeInLeft"
								data-wow-delay=".2s"
							>
								<div className="about-img overflow-hidden">
									<Image
										src={image}
										alt={imageAlt || ""}
										width={653}
										height={450}
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="col-lg-5">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>
									{subtitle}
								</span>
								<h2 className="sec-title title-anim">
									{title} {highlight ? <span>{highlight}</span> : ""}
								</h2>
							</div>
						</div>
					)}
					<div className={image ? "col-lg-6" : "col-lg-7"}>
						{image ? (
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>
									{subtitle}
								</span>
								<h2 className="sec-title title-anim">
									{title} {highlight ? <span>{highlight}</span> : ""}
								</h2>
							</div>
						) : (
							""
						)}
						<div className="wow fadeInUp" data-wow-delay=".4s">
							{children}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PageIntro;
