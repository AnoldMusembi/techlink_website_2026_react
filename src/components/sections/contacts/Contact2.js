"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ReactNiceSelect from "@/components/shared/Inputs/ReactNiceSelect";
import {
	CONTACT_INQUIRY_OPTIONS,
	submitContactForm,
} from "@/libs/submitContactForm";
import Link from "next/link";
import { useState } from "react";

const Contact2 = () => {
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
		<section className="tj-contact-section section-gap section-gap-x">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="global-map wow fadeInUp" data-wow-delay=".3s">
							<div className="global-map-img">
								<img src="/images/bg/map.svg" alt="" />
								<div className="location-indicator loc-kenya">
									<div className="location-tooltip">
										<span>Head office:</span>
										<p>Tulip Tower, Floor #01, Mpaka Rd, Westlands, Nairobi</p>
										<Link href="tel:+254777434354">P: +254 777 434 354</Link>
										<Link href="mailto:info@techlinklimited.co.ke">
											M: info@techlinklimited.co.ke
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div
							className="contact-form style-2 wow fadeInUp"
							data-wow-delay=".4s"
						>
							<div className="sec-heading">
								<span className="sub-title text-white">
									<i className="tji-box"></i>Get in Touch
								</span>
								<h2 className="sec-title title-anim">
									Drop Us a <span>Line.</span>
								</h2>
							</div>
							<form id="contact-form-2" onSubmit={handleSubmit} noValidate>
								<div className="row wow fadeInUp" data-wow-delay=".5s">
									<div className="col-sm-6">
										<div className="form-input">
											<input
												type="text"
												name="name"
												placeholder="Full Name *"
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
												placeholder="Email Address *"
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
												placeholder="Phone number *"
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
												id="message-2"
												placeholder="Type message *"
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												required
											></textarea>
										</div>
									</div>
									{/* Honeypot — leave empty */}
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
														status.type === "success" ? "#7dffa0" : "#ffb4b4",
												}}
											>
												{status.text}
											</p>
										</div>
									) : null}
									<div className="submit-btn">
										<ButtonPrimary
											text={sending ? "Sending..." : "Send Message"}
											type={"submit"}
											disabled={sending}
										/>
									</div>
								</div>
							</form>
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
		</section>
	);
};

export default Contact2;
