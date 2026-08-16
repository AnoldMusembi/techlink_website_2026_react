import FeatureCard from "@/components/shared/cards/FeatureCard";

const WhyTechlink = () => {
	const features = [
		{
			title: "Genuine Products",
			desc: "We supply only authentic products from trusted global brands.",
			icon: "tji-award",
		},
		{
			title: "Modern, Friendly Service",
			desc: "Clear communication and a helpful, customer-first approach.",
			icon: "tji-innovative",
		},
		{
			title: "Solution-First Approach",
			desc: "Recommendations aligned to your needs, timelines, and budget.",
			icon: "tji-box",
		},
		{
			title: "Skilled Technical Team",
			desc: "Certified professionals for deployment and ongoing support.",
			icon: "tji-support",
		},
		{
			title: "Competitive Pricing",
			desc: "Strong partnerships enable fair, transparent pricing.",
			icon: "tji-service-1",
		},
		{
			title: "End-to-End Support",
			desc: "From pre-sales and design to deployment and after-sales.",
			icon: "tji-service-2",
		},
		{
			title: "Multi-Channel Sales",
			desc: "Walk-in, online, telesales, and on-site visits for convenience.",
			icon: "tji-service-3",
		},
	];

	return (
		<section id="choose" className="tj-choose-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading text-center">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								<i className="tji-box"></i>Why choose us
							</span>
							<h2 className="sec-title title-anim">
								Why choose to work with <span>Techlink.</span>
							</h2>
						</div>
					</div>
				</div>
				<div className="row row-gap-4 rightSwipeWrap">
					{features.map((feature, idx) => (
						<div key={idx} className="col-lg-4 col-md-6">
							<FeatureCard feature={feature} idx={idx} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyTechlink;
