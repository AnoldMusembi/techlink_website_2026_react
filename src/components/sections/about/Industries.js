import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import getIndustries from "@/libs/getIndustries";
import Image from "next/image";
import Link from "next/link";

const Industries = () => {
	const industries = getIndustries();

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
						<div key={item.slug || idx} className="col-lg-4 col-md-6">
							<div
								className="service-item style-1 wow fadeInUp"
								data-wow-delay={`${0.2 + idx * 0.05}s`}
							>
								<div className="service-img">
									<Link href={item.path}>
										<Image
											src={item.img}
											alt={item.title}
											width={870}
											height={450}
											unoptimized
										/>
									</Link>
								</div>
								<div className="service-content">
									<h4 className="title">
										<Link href={item.path}>{item.title}</Link>
									</h4>
									<p className="desc">{item.desc}</p>
									<ButtonPrimary
										text={"Learn More"}
										url={item.path}
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
