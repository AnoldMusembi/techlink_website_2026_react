import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";

const industries = [
	{
		title: "Education",
		desc: "Campus networks, labs, devices, and licensing that keep teaching and learning online.",
		img: "/images/industries/education.webp",
	},
	{
		title: "Banking",
		desc: "Secure infrastructure, endpoints, and data protection for financial operations.",
		img: "/images/industries/banking.webp",
	},
	{
		title: "Transport",
		desc: "Connected systems, networking, and support for logistics and fleet teams.",
		img: "/images/industries/transport.webp",
	},
	{
		title: "Real Estate",
		desc: "Workplace IT, property networks, CCTV, and access control for sites and offices.",
		img: "/images/industries/real-estate.webp",
	},
	{
		title: "Healthcare",
		desc: "Reliable systems and support for clinics, hospitals, and care teams.",
		img: "/images/industries/healthcare.webp",
	},
	{
		title: "Manufacturing",
		desc: "Industrial networks, servers, and shop-floor IT that keep production moving.",
		img: "/images/industries/manufacturing.webp",
	},
];

const Industries = () => {
	return (
		<section className="tj-service-section service-4 industries-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading text-center">
							<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
								<i className="tji-box"></i>Our client base
							</span>
							<h2 className="sec-title title-anim">
								Industries in the market we <span>serve.</span>
							</h2>
						</div>
					</div>
				</div>
				<div className="row row-gap-4">
					{industries.map((item, idx) => (
						<div key={idx} className="col-lg-4 col-md-6">
							<div
								className="service-item style-1 wow fadeInUp"
								data-wow-delay={`${0.2 + idx * 0.05}s`}
							>
								<div className="service-img">
									<Image
										src={item.img}
										alt={item.title}
										width={870}
										height={450}
									/>
								</div>
								<div className="service-content">
									<h4 className="title">{item.title}</h4>
									<p className="desc">{item.desc}</p>
									<ButtonPrimary
										text={"Learn More"}
										url={"/contact"}
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Industries;
