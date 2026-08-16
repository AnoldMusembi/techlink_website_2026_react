import Image from "next/image";
import Link from "next/link";
import ButtonPrimary from "../buttons/ButtonPrimary";

const ServiceCard1 = ({ service, idx, lastItem }) => {
	const { title, desc, id, img, iconName, url } = service || {};
	const href = url ? url : `/services/${id}`;

	return (
		<div className="service-item style-1">
			<div className="service-img">
				<Image
					src={img ? img : "/images/service/offer-1.webp"}
					alt={title ? title : "Service"}
					width={870}
					height={450}
					unoptimized
				/>
			</div>
			<div className="service-icon">
				<i className={iconName ? iconName : "tji-service-1"}></i>
			</div>
			<div className="service-content">
				<h4 className="title">
					<Link href={href}>{title}</Link>
				</h4>
				<p className="desc">
					{desc
						? desc
						: "Through a combination of data-driven insights and innovative approaches, we work closely with you to develop customized."}
				</p>
				<ButtonPrimary
					text={"Learn More"}
					url={href}
					isTextBtn={true}
				/>
			</div>
		</div>
	);
};

export default ServiceCard1;
