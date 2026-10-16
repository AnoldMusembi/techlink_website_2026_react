import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const reasons = [
	{
		icon: "tji-service-1",
		title: "Real ICT work",
		desc: "Work on networks, cloud, cybersecurity, and enterprise projects for clients across Kenya.",
	},
	{
		icon: "tji-service-5",
		title: "Growth & mentoring",
		desc: "Learn from experienced engineers and consultants while taking on responsibility early.",
	},
	{
		icon: "tji-service-3",
		title: "Trusted brands",
		desc: "Gain hands-on experience with Microsoft, HP, Dell, Lenovo, Cisco, and other global partners.",
	},
	{
		icon: "tji-service-6",
		title: "Client-facing impact",
		desc: "Help homes, SMEs, and enterprises solve practical technology problems that matter.",
	},
];

const CareersIntro = () => {
	return (
		<section className="tj-about-section section-gap careers-intro">
			<div className="container">
				<div className="row align-items-center row-gap-4">
					<div className="col-lg-5">
						<div className="sec-heading">
							<span className="sub-title wow fadeInUp" data-wow-delay=".2s">
								<i className="tji-box"></i>Careers at Techlink
							</span>
							<h2 className="sec-title title-anim">
								Build your career in ICT with a <span>Kenyan team.</span>
							</h2>
						</div>
					</div>
					<div className="col-lg-7">
						<div className="wow fadeInUp" data-wow-delay=".3s">
							<p>
								Techlink Limited is a Kenyan-owned ICT company based in
								Westlands, Nairobi. Since 2012 we have helped clients with
								genuine products, data centre solutions, cloud, cybersecurity,
								and everyday IT support.
							</p>
							<p>
								We look for people who are curious, reliable, and ready to grow.
								Whether you are technical, commercial, or operations-focused,
								you will work in a team that values clear communication and
								practical delivery.
							</p>
							<ButtonPrimary text="View openings" url="#open-roles" />
						</div>
					</div>
				</div>
				<div className="row row-gap-4 mt-5">
					{reasons.map((item, idx) => (
						<div key={item.title} className="col-lg-3 col-sm-6">
							<div
								className="careers-reason wow fadeInUp"
								data-wow-delay={`${0.2 + idx * 0.08}s`}
							>
								<div className="careers-reason-icon">
									<i className={item.icon}></i>
								</div>
								<h4>{item.title}</h4>
								<p>{item.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default CareersIntro;
