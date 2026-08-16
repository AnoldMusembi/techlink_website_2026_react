"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ReactNiceSelect from "@/components/shared/Inputs/ReactNiceSelect";

const Contact3 = () => {
	return (
		<section className="tj-contact-section-2 section-bottom-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="contact-form wow fadeInUp" data-wow-delay=".1s">
							<h3 className="title">
								Feel free to get in touch or visit our Nairobi office.
							</h3>
							<form id="contact-form">
								<div className="row">
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="text"
												name="cfName"
												placeholder="Full Name*"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="email"
												name="cfEmail"
												placeholder="Email Address*"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="tel"
												name="cfPhone"
												placeholder="Phone number*"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input">
											<div className="tj-nice-select-box">
												<div className="tj-select">
													<ReactNiceSelect
														selectedIndex={0}
														options={[
															{
																value: "0",
																optionName: "Your inquiry about",
															},
															{
																value: "1",
																optionName: "General Information Request",
															},
															{
																value: "2",
																optionName: "Partner Relations",
															},
															{
																value: "3",
																optionName: "Careers",
															},
															{
																value: "4",
																optionName: "Software Licensing",
															},
														]}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-input message-input">
											<textarea
												name="cfMessage"
												id="message"
												placeholder="Type message*"
											></textarea>
										</div>
									</div>
									<div className="submit-btn">
										<ButtonPrimary type={"submit"} text={"Submit Now"} />
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="map-area wow fadeInUp" data-wow-delay=".3s">
							<iframe
								title="Techlink Limited, Westlands Nairobi"
								src="https://maps.google.com/maps?q=Tulip%20Tower%20Mpaka%20Road%20Westlands%20Nairobi&t=&z=16&ie=UTF8&iwloc=&output=embed"
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact3;
