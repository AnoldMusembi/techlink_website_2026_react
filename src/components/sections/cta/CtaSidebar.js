import Link from "next/link";

const CtaSidebar = () => {
	return (
		<div className="feature-box">
			<div className="feature-content">
				<h2 className="title">Talk to us</h2>
				<span>ICT solutions for home and business</span>
				<Link className="read-more feature-contact" href="tel:+254777434354">
					<i className="tji-phone-3"></i>
					<span>+254 777 434 354</span>
				</Link>
			</div>
			<div className="feature-images">
				<img src="/images/service/service-ad.webp" alt="" />
			</div>
		</div>
	);
};

export default CtaSidebar;
