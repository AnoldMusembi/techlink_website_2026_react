"use client";

import { PortableText } from "@portabletext/react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import { fetchCareerBySlug } from "@/libs/getCareers";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const CareerDetailsClient = ({ slug }) => {
	const [job, setJob] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let alive = true;
		if (!slug) {
			setLoading(false);
			setError("Missing job reference.");
			return undefined;
		}
		(async () => {
			setLoading(true);
			setError("");
			try {
				const data = await fetchCareerBySlug(slug);
				if (!alive) return;
				if (!data) setError("This role is no longer available.");
				setJob(data);
			} catch {
				if (alive) setError("Unable to load this role right now.");
			} finally {
				if (alive) setLoading(false);
			}
		})();
		return () => {
			alive = false;
		};
	}, [slug]);

	const mailto = useMemo(() => {
		if (!job) return "mailto:info@techlinklimited.co.ke";
		const subject = encodeURIComponent(`Application: ${job.title}`);
		const body = encodeURIComponent(
			`Hello Techlink team,\n\nI would like to apply for the ${job.title} role.\n\nName:\nPhone:\nLinkedIn / portfolio:\n\nThank you.`
		);
		return `mailto:${job.applyEmail || "info@techlinklimited.co.ke"}?subject=${subject}&body=${body}`;
	}, [job]);

	if (loading) {
		return (
			<section className="tj-careers-details section-gap">
				<div className="container">
					<div className="careers-empty">
						<p>Loading role details…</p>
					</div>
				</div>
			</section>
		);
	}

	if (error || !job) {
		return (
			<section className="tj-careers-details section-gap">
				<div className="container">
					<div className="careers-empty">
						<h3 className="sec-title">Role not found</h3>
						<p>{error || "This opening may have been closed."}</p>
						<ButtonPrimary text="Back to careers" url="/careers" />
					</div>
				</div>
			</section>
		);
	}

	const {
		title,
		iconName,
		category,
		need,
		location,
		price,
		duration,
		desc,
		description,
		requirements,
		responsibilities,
		vacancies,
		publishedAt,
	} = job;

	return (
		<section className="tj-careers-details section-gap">
			<div className="container">
				<div className="row rg-50">
					<div className="col-lg-8">
						<div className="tj-post-wrapper">
							<div className="tj-post-single-post">
								<div className="tj-careers-top mb-30">
									<div className="tj-careers-top-icon">
										<i className={iconName ? iconName : "tji-manage"}></i>
									</div>
									<div className="tj-careers-top-content">
										<div className="tj-careers-tag">
											<span>{category}</span> <span>{need}</span>
										</div>
										<h3 className="tj-careers-top-title">{title}</h3>
										<span className="location">
											<i className="tji-location"></i>
											{location}
										</span>
									</div>
								</div>

								<div className="tj-entry-content">
									{desc ? <p>{desc}</p> : null}

									{Array.isArray(description) && description.length ? (
										<>
											<h4>Job description</h4>
											<div className="careers-portable-text">
												<PortableText value={description} />
											</div>
										</>
									) : null}

									{requirements?.length ? (
										<div className="tj-check-list mt-4">
											<h4>Requirements</h4>
											<ul>
												{requirements.map((item) => (
													<li key={item}>
														<span>
															<i className="tji-check"></i>
														</span>{" "}
														{item}
													</li>
												))}
											</ul>
										</div>
									) : null}

									{responsibilities?.length ? (
										<div className="tj-check-list mt-4">
											<h4>Responsibilities</h4>
											<ul>
												{responsibilities.map((item) => (
													<li key={item}>
														<span>
															<i className="tji-check"></i>
														</span>{" "}
														{item}
													</li>
												))}
											</ul>
										</div>
									) : null}
								</div>

								<div className="tj-post__navigation mb-0 mt-4">
									<div className="tj-nav__post previous">
										<div className="tj-nav-post__nav prev_post">
											<Link href="/careers">
												<span>
													<i className="tji-arrow-left"></i>
												</span>
												All openings
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-4">
						<aside className="tj-blog-sidebar">
							<div className="tj-sidebar-widget">
								<h4 className="widget-title">Job information</h4>
								<div className="project_catagory">
									<ul>
										<li>
											<span className="first-child">Category</span>
											<span>{category}</span>
										</li>
										<li>
											<span className="first-child">Type</span>
											<span>{need}</span>
										</li>
										<li>
											<span className="first-child">Company</span>
											<span>Techlink Limited</span>
										</li>
										<li>
											<span className="first-child">Location</span>
											<span>{location}</span>
										</li>
										<li>
											<span className="first-child">Salary</span>
											<span>
												{price}
												{duration ? ` / ${duration}` : ""}
											</span>
										</li>
										<li>
											<span className="first-child">Vacancy</span>
											<span>
												{vacancies} Available
											</span>
										</li>
										{publishedAt ? (
											<li>
												<span className="first-child">Posted</span>
												<span>
													{new Date(publishedAt).toLocaleDateString("en-KE", {
														year: "numeric",
														month: "short",
														day: "numeric",
													})}
												</span>
											</li>
										) : null}
									</ul>
								</div>
							</div>

							<div className="tj-sidebar-widget">
								<h4 className="widget-title">Apply</h4>
								<p>
									Send your CV and a short cover note. We will reply if there is
									a fit.
								</p>
								<a className="tj-primary-btn" href={mailto}>
									<span className="btn-text">
										<span>Email your application</span>
									</span>
									<span className="btn-icon">
										<i className="tji-arrow-right-long"></i>
									</span>
								</a>
								<div className="mt-3">
									<ButtonPrimary
										text="Or use contact form"
										url="/contact"
										isTextBtn={true}
									/>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CareerDetailsClient;
