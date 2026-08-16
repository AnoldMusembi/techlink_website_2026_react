"use client";
import ServiceCard1 from "@/components/shared/cards/ServiceCard1";
import getHomeOfferings from "@/libs/getHomeOfferings";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ServicesSlider1 = () => {
	const showableSevices = getHomeOfferings();
	const services = [...showableSevices, ...showableSevices];
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="swiper service-slider">
				<div className="swiper-wrapper">
					{services?.length
						? services.map((service, idx) => (
								<div key={idx} className="swiper-slide">
									<ServiceCard1 service={service} idx={idx} />
								</div>
						  ))
						: ""}
				</div>
				<div className="swiper-pagination-area white-pagination"></div>
			</div>
		);
	}

	return (
		<Swiper
			slidesPerView={1.3}
			spaceBetween={15}
			loop={true}
			speed={1500}
			centeredSlides={true}
			autoplay={{
				delay: 5000,
			}}
			pagination={{
				el: ".swiper-pagination-area",
				clickable: true,
			}}
			breakpoints={{
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2.3,
				},
				900: {
					slidesPerView: 2.6,
				},
				1024: {
					slidesPerView: 3.2,
				},
				1200: {
					slidesPerView: 3.4,
					spaceBetween: 28,
				},
				1400: {
					slidesPerView: 4.2,
					spaceBetween: 28,
				},
			}}
			modules={[Pagination, Autoplay]}
			className="service-slider"
		>
			{services?.length
				? services.map((service, idx) => (
						<SwiperSlide key={idx}>
							<ServiceCard1 service={service} idx={idx} />
						</SwiperSlide>
				  ))
				: ""}
			<div className="swiper-pagination-area white-pagination"></div>
		</Swiper>
	);
};

export default ServicesSlider1;
