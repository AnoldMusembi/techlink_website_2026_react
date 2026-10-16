"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import CareerCard from "@/components/shared/cards/CareerCard";
import { fetchCareers } from "@/libs/getCareers";
import { isSanityConfigured } from "@/libs/sanity";
import { useEffect, useState } from "react";

const Careers1 = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let alive = true;
		(async () => {
			setLoading(true);
			setError("");
			try {
				const jobs = await fetchCareers();
				if (alive) setItems(jobs || []);
			} catch (e) {
				if (alive) {
					setError("Unable to load openings right now.");
					setItems([]);
				}
			} finally {
				if (alive) setLoading(false);
			}
		})();
		return () => {
			alive = false;
		};
	}, []);

	return (
		<section id="open-roles" className="tj-careers-section section-gap">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="sec-heading text-center">
							<span className="sub-title wow fadeInUp" data-wow-delay=".2s">
								<i className="tji-box"></i>Open roles
							</span>
							<h2 className="sec-title title-anim">
								Current <span>openings</span>
							</h2>
							{isSanityConfigured() ? (
								<p className="careers-source-note">
									Listings are managed in Sanity CMS and update when published.
								</p>
							) : null}
						</div>
					</div>
				</div>

				{loading ? (
					<div className="row justify-content-center">
						<div className="col-xl-8 col-lg-9">
							<div className="careers-empty">
								<p>Loading openings…</p>
							</div>
						</div>
					</div>
				) : error ? (
					<div className="row justify-content-center">
						<div className="col-xl-8 col-lg-9">
							<div className="careers-empty">
								<p>{error}</p>
								<ButtonPrimary text="Contact us" url="/contact" />
							</div>
						</div>
					</div>
				) : !items.length ? (
					<div className="row justify-content-center">
						<div className="col-xl-8 col-lg-9">
							<div className="careers-empty">
								<div className="careers-empty-icon">
									<i className="tji-user"></i>
								</div>
								<span className="sub-title">
									<i className="tji-box"></i>Join the team
								</span>
								<h3 className="sec-title">
									No openings at the <span>moment.</span>
								</h3>
								<p>
									We do not have any open roles right now. When a position
									becomes available, it will be listed here. You are still
									welcome to send your CV for future consideration.
								</p>
								<div className="careers-empty-actions">
									<a
										className="tj-primary-btn"
										href="mailto:info@techlinklimited.co.ke?subject=Career%20enquiry%20-%20Techlink"
									>
										<span className="btn-text">
											<span>Send us your CV</span>
										</span>
										<span className="btn-icon">
											<i className="tji-arrow-right-long"></i>
										</span>
									</a>
									<ButtonPrimary
										text={"Contact us"}
										url={"/contact"}
										isTextBtn={true}
									/>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="row rg-30">
						{items.map((careerSingle, idx) => (
							<div
								className="col-xl-4 col-md-6"
								key={careerSingle.slug || careerSingle.id || idx}
							>
								<CareerCard careerSingle={careerSingle} idx={idx} />
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Careers1;
