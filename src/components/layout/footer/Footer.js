import Link from "next/link";

const Footer = () => {
	return (
		<footer className="tj-footer-section footer-1 section-gap-x">
			<div className="footer-main-area">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-xl-3 col-lg-4 col-md-6">
							<div className="footer-widget wow fadeInUp" data-wow-delay=".1s">
								<div className="footer-logo">
									<Link href="/">
										<img src="/images/logos/logo.webp" alt="Techlink Limited" />
									</Link>
								</div>
								<div className="footer-text">
									<p>
										Kenyan-owned ICT company established in 2012. Genuine
										products, smart solutions, and friendly support from
										everyday devices to data centre and cloud.
									</p>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-lg-4 col-md-6">
							<div
								className="footer-widget widget-nav-menu wow fadeInUp"
								data-wow-delay=".3s"
							>
								<h5 className="title">Services</h5>
								<ul>
									<li>
										<Link href="/services/1">ICT Installation</Link>
									</li>
									<li>
										<Link href="/services/2">Network Design</Link>
									</li>
									<li>
										<Link href="/services/3">Cybersecurity</Link>
									</li>
									<li>
										<Link href="/services/4">Cloud Services</Link>
									</li>
									<li>
										<Link href="/services/5">IT Support</Link>
									</li>
									<li>
										<Link href="/data-center">Data Center Solutions</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-xl-2 col-lg-4 col-md-6">
							<div
								className="footer-widget widget-nav-menu wow fadeInUp"
								data-wow-delay=".5s"
							>
								<h5 className="title">Company</h5>
								<ul>
									<li>
										<Link href="/about">About us</Link>
									</li>
									<li>
										<Link href="/careers">Careers</Link>
									</li>
									<li>
										<Link href="/services">All services</Link>
									</li>
									<li>
										<Link href="/ict-products">ICT Products</Link>
									</li>
									<li>
										<Link href="/contact">Contact us</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-xl-4 col-lg-5 col-md-6">
							<div
								className="footer-widget widget-subscribe wow fadeInUp"
								data-wow-delay=".7s"
							>
								<h3 className="title">Visit or call us.</h3>
								<div className="footer-text">
									<p>
										Tulip Tower, Floor #01, Mpaka Rd, Westlands, Nairobi
										<br />
										8:00 AM – 6:00 PM, Monday–Saturday
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="tj-copyright-area">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="copyright-content-area">
								<div className="footer-contact">
									<ul>
										<li>
											<Link href="tel:+254777434354">
												<span className="icon">
													<i className="tji-phone-2"></i>
												</span>
												<span className="text">+254 777 434 354</span>
											</Link>
										</li>
										<li>
											<Link href="mailto:info@techlinklimited.co.ke">
												<span className="icon">
													<i className="tji-envelop-2"></i>
												</span>
												<span className="text">info@techlinklimited.co.ke</span>
											</Link>
										</li>
									</ul>
								</div>
								<div className="social-links">
									<ul>
										<li>
											<Link href="https://www.facebook.com/" target="_blank">
												<i className="fa-brands fa-facebook-f"></i>
											</Link>
										</li>
										<li>
											<Link href="https://www.instagram.com/" target="_blank">
												<i className="fa-brands fa-instagram"></i>
											</Link>
										</li>
										<li>
											<Link href="https://x.com/" target="_blank">
												<i className="fa-brands fa-x-twitter"></i>
											</Link>
										</li>
										<li>
											<Link href="https://www.linkedin.com/" target="_blank">
												<i className="fa-brands fa-linkedin-in"></i>
											</Link>
										</li>
									</ul>
								</div>
								<div className="copyright-text">
									<p>
										&copy; {new Date().getFullYear()}{" "}
										<Link href="/">Techlink Limited</Link> All rights reserved
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</footer>
	);
};

export default Footer;
