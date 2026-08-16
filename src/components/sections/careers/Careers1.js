"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import CareerCard from "@/components/shared/cards/CareerCard";
import Paginations from "@/components/shared/others/Paginations";
import usePagination from "@/hooks/usePagination";
import getCareers from "@/libs/getCareers";

const Careers1 = () => {
	const items = getCareers();
	const limit = 6;
	const {
		currentItems,
		currentpage,
		setCurrentpage,
		paginationItems,
		currentPaginationItems,
		totalPages,
		handleCurrentPage,
		firstItem,
		lastItem,
	} = usePagination(items, limit);
	const totalItems = items?.length;
	const totalItemsToShow = currentItems?.length;

	if (!totalItems) {
		return (
			<section className="tj-careers-section section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-8 col-lg-9">
							<div className="careers-empty wow fadeInUp" data-wow-delay=".2s">
								<div className="careers-empty-icon">
									<i className="tji-user"></i>
								</div>
								<span className="sub-title">
									<i className="tji-box"></i>Join the team
								</span>
								<h2 className="sec-title">
									No openings at the <span>moment.</span>
								</h2>
								<p>
									We do not have any open roles right now. When a position
									becomes available, it will be listed here. You are still
									welcome to send your CV for future consideration.
								</p>
								<ButtonPrimary
									text={"Send us your CV"}
									url={
										"mailto:info@techlinklimited.co.ke?subject=Career%20enquiry"
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="tj-careers-section section-gap">
			<div className="container">
				<div className="row rg-30">
					{currentItems?.map((careerSingle, idx) => (
						<div className="col-xl-4 col-md-6" key={idx}>
							<CareerCard careerSingle={careerSingle} idx={idx} />
						</div>
					))}
				</div>
				{totalItemsToShow < totalItems ? (
					<Paginations
						paginationDetails={{
							currentItems,
							currentpage,
							setCurrentpage,
							paginationItems,
							currentPaginationItems,
							totalPages,
							handleCurrentPage,
							firstItem,
							lastItem,
						}}
					/>
				) : (
					""
				)}
			</div>
		</section>
	);
};

export default Careers1;
