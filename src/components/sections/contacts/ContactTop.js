import Link from "next/link";

const ContactTop = () => {
	return (
		<div className="tj-contact-area section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading text-center">
							<span className="sub-title wow fadeInUp" data-wow-delay=".1s">
								<i className="tji-box"></i>Contact info
							</span>
							<h2 className="sec-title title-anim">
								<span>Reach</span> out to us
							</h2>
							<p className="wow fadeInUp" data-wow-delay=".2s">
								To make requests for further information, contact us via our
								channels. We just need a couple of hours — no more than 2
								working days since receiving your enquiry.
							</p>
						</div>
					</div>
				</div>
				<div className="row row-gap-4">
					<div className="col-xl-3 col-lg-6 col-sm-6">
						<div
							className="contact-item style-2 wow fadeInUp"
							data-wow-delay=".3s"
						>
							<div className="contact-icon">
								<i className="tji-location-3"></i>
							</div>
							<h3 className="contact-title">Our location</h3>
							<p>Tulip Tower, Floor #01, Mpaka Rd, Westlands, Nairobi</p>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-sm-6">
						<div
							className="contact-item style-2 wow fadeInUp"
							data-wow-delay=".5s"
						>
							<div className="contact-icon">
								<i className="tji-envelop"></i>
							</div>
							<h3 className="contact-title">Email us</h3>
							<ul className="contact-list">
								<li>
									<Link href="mailto:info@techlinklimited.co.ke">
										info@techlinklimited.co.ke
									</Link>
								</li>
								<li>
									<Link href="mailto:sales@techlinklimited.co.ke">
										sales@techlinklimited.co.ke
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-sm-6">
						<div
							className="contact-item style-2 wow fadeInUp"
							data-wow-delay=".7s"
						>
							<div className="contact-icon">
								<i className="tji-phone"></i>
							</div>
							<h3 className="contact-title">Call us</h3>
							<ul className="contact-list">
								<li>
									<Link href="tel:+254204343500">+254 204 343 500</Link>
								</li>
								<li>
									<Link href="tel:+254777434354">+254 777 434 354</Link>
								</li>
								<li>
									<Link href="tel:+254745551636">+254 745 551 636</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-sm-6">
						<div
							className="contact-item style-2 wow fadeInUp"
							data-wow-delay=".9s"
						>
							<div className="contact-icon">
								<i className="tji-chat"></i>
							</div>
							<h3 className="contact-title">Hours</h3>
							<ul className="contact-list">
								<li>8:00 AM – 6:00 PM</li>
								<li>Monday to Saturday</li>
								<li className="active">Online 24/7</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactTop;
