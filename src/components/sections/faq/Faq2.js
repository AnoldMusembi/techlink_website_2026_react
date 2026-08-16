import FaqItem from "@/components/shared/faq/FaqItem";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";

const Faq2 = ({ type = 1 }) => {
	const items = [
		{
			title: "Why choose genuine products from Techlink?",
			desc: "We supply only authentic products from trusted global brands, with manufacturer warranties. That means reliable kit, valid support, and no grey-market surprises for your home or business.",
			initActive: true,
		},
		{
			title: "How do you support clients after the sale?",
			desc: "From first enquiry to after-sales, you get clear communication and a helpful team. We install, configure, and stay available for maintenance, repairs, and upgrades so systems keep running.",
			initActive: false,
		},
		{
			title: "Who handles installation and technical work?",
			desc: "Certified professionals handle deployment, installation, and ongoing support. We size the solution to your site, timeline, and budget, then document the setup for easy handover.",
			initActive: false,
		},
		{
			title: "Do you cover both supply and implementation?",
			desc: "Yes. As a value-added reseller we supply genuine products and can design, install, and support them end to end. You can also buy supply only if you already have a technical team.",
			initActive: false,
		},
		{
			title: "How do I get started with Techlink?",
			desc: "Call, email, or send the form on this page. Typical reply is within a couple of hours, and no more than two working days. We assess your needs, then recommend products and a practical plan.",
			initActive: false,
		},
	];
	return (
		<section
			className={`tj-faq-section section-gap  ${
				type === 3 || type === 4 ? "" : "tj-arrange-container-2"
			}`}
		>
			<div className="container">
				<div className="row justify-content-between">
					{type === 3 ? (
						<div className="col-lg-4">
							<div className="content-wrap">
								<div className="sec-heading">
									<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
										<i className="tji-box"></i>Why Choose Us
									</span>
									<h2 className="sec-title title-anim">
										Need <span>Help?</span> Start Here...
									</h2>
								</div>
								<div className="wow fadeInUp" data-wow-delay=".8s">
									<Link className="tj-primary-btn" href="/contact">
										Request a Call
									</Link>
								</div>
							</div>
						</div>
					) : (
						<div className="col-lg-6">
							<div
								className={`faq-img-area ${
									type === 3 ? "" : "tj-arrange-item-2"
								}`}
							>
								<div className="faq-img overflow-hidden">
									<Image
										src="/images/about/techlink-about.webp"
										alt="Techlink Limited"
										width={585}
										height={629}
									/>
									<h2 className={`title ${type === 4 ? "title-anim" : ""}`}>
										Why Choose Us
									</h2>
								</div>
								<div className="box-area ">
									<div className="call-box">
										<h4 className="title">Talk to us today</h4>
										<span className="call-icon">
											<i className="tji-phone"></i>
										</span>
										<Link className="number" href="tel:+254777434354">
											<span>+254 777 434 354</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					)}

					<div className={`col-lg-${type === 3 ? "8" : "6"}`}>
						<BootstrapWrapper>
							<div
								className={`accordion tj-faq ${
									type === 2 || type === 4 ? "style-2" : ""
								} ${type === 3 || type === 4 ? "" : "tj-arrange-item-2"}`}
								id="faqOne"
							>
								{items?.length
									? items?.map((item, idx) => (
											<FaqItem key={idx} item={item} idx={idx} />
									  ))
									: ""}
							</div>
						</BootstrapWrapper>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Faq2;
