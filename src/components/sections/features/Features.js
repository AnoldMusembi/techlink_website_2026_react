import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import FeatureCard from "@/components/shared/cards/FeatureCard";

const Features = ({ type }) => {
	const features = [
		{
			title: "Genuine Products",
			desc: "We supply only authentic products from trusted global brands, with manufacturer warranties.",
			icon: "tji-award",
		},
		{
			title: "Modern & Friendly Service",
			desc: "Clear communication and a helpful, customer-first approach from first enquiry to after-sales.",
			icon: "tji-innovative",
		},
		{
			title: "Skilled Technical Team",
			desc: "We work with certified professionals for deployment, installation, and ongoing support.",
			icon: "tji-support",
		},
	];

	return (
		<section id="choose" className="tj-choose-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{type == 2 ? (
							<div className="sec-heading-wrap">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Why Choose Us
								</span>
								<div className="heading-wrap-content">
									<div className="sec-heading">
										<h2 className="sec-title title-anim">
											Our commitment to genuine ICT products and{" "}
											<span>services.</span>
										</h2>
									</div>
									<div className="btn-wrap wow fadeInUp" data-wow-delay=".6s">
										<ButtonPrimary text="Reach Out" url="/contact" />
									</div>
								</div>
							</div>
						) : (
							<div className="sec-heading text-center">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Why Choose Us
								</span>
								<h2 className="sec-title title-anim">
									Our commitment to genuine ICT products and{" "}
									<span>services.</span>
								</h2>
							</div>
						)}
					</div>
				</div>
				<div className="row row-gap-4 rightSwipeWrap">
					{features.map((feature, idx) => (
						<div key={idx} className="col-lg-4">
							<FeatureCard feature={feature} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default Features;
