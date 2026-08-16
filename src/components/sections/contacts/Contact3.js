"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ReactNiceSelect from "@/components/shared/Inputs/ReactNiceSelect";
import {
	CONTACT_INQUIRY_OPTIONS,
	submitContactForm,
} from "@/libs/submitContactForm";
import { useState } from "react";

const Contact3 = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [inquiry, setInquiry] = useState("");
	const [message, setMessage] = useState("");
	const [honeypot, setHoneypot] = useState("");
	const [status, setStatus] = useState({ type: "", text: "" });
	const [sending, setSending] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSending(true);
		setStatus({ type: "", text: "" });

		const result = await submitContactForm({
			name,
			email,
			phone,
			inquiry,
			message,
			company_website: honeypot,
		});

		setSending(false);
		if (result.ok) {
			setStatus({ type: "success", text: result.message });
			setName("");
			setEmail("");
			setPhone("");
			setInquiry("");
			setMessage("");
			return;
		}
		setStatus({ type: "error", text: result.error });
	};

	return (
		<section className="tj-contact-section-2 section-bottom-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="contact-form wow fadeInUp" data-wow-delay=".1s">
							<h3 className="title">
								Feel free to get in touch or visit our Nairobi office.
							</h3>
							<form id="contact-form" onSubmit={handleSubmit} noValidate>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="text"
												name="name"
												placeholder="Full Name*"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
												autoComplete="name"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="email"
												name="email"
												placeholder="Email Address*"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
												autoComplete="email"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="tel"
												name="phone"
												placeholder="Phone number*"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												required
												autoComplete="tel"
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-input">
											<div className="tj-nice-select-box">
												<div className="tj-select">
													<ReactNiceSelect
														selectedIndex={0}
														options={CONTACT_INQUIRY_OPTIONS}
														getSelectedOption={(option) =>
															setInquiry(option?.optionName || "")
														}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="form-input message-input">
											<textarea
												name="message"
												id="message"
												placeholder="Type message*"
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												required
											></textarea>
										</div>
									</div>
									<input
										type="text"
										name="company_website"
										value={honeypot}
										onChange={(e) => setHoneypot(e.target.value)}
										tabIndex={-1}
										autoComplete="off"
										aria-hidden="true"
										style={{
											position: "absolute",
											left: "-9999px",
											height: 0,
											width: 0,
											opacity: 0,
										}}
									/>
									{status.text ? (
										<div className="col-sm-12" style={{ marginBottom: "12px" }}>
											<p
												role="status"
												style={{
													margin: 0,
													color:
														status.type === "success" ? "#0a7a3e" : "#b42318",
												}}
											>
												{status.text}
											</p>
										</div>
									) : null}
									<div className="submit-btn">
										<ButtonPrimary
											type={"submit"}
											text={sending ? "Sending..." : "Submit Now"}
											disabled={sending}
										/>
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
