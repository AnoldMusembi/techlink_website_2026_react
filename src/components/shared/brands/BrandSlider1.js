"use client";

import getBrands from "@/libs/getBrands";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BrandSlider1 = ({ className }) => {
	const brands = getBrands();
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	const sliderClass = `client-slider ${className ? className : "client-slider-1"}`;
	const slides = brands?.length
		? brands.map(({ img, name }, idx) => (
				<div key={idx} className="client-item">
					<div className="client-logo">
						<img
							src={img ? img : "/images/brands/brand-1.webp"}
							alt={name ? name : "Partner brand"}
						/>
					</div>
				</div>
		  ))
		: null;

	if (!mounted) {
		return (
			<div className={`swiper ${sliderClass}`}>
				<div className="swiper-wrapper">{slides}</div>
			</div>
		);
	}

	return (
		<Swiper
			slidesPerView="auto"
			spaceBetween={0}
			freeMode={true}
			centeredSlides={true}
			loop={true}
			speed={5000}
			allowTouchMove={false}
			autoplay={{
				delay: 1,
				disableOnInteraction: false,
			}}
			className={sliderClass}
			modules={[Autoplay]}
		>
			{brands?.length
				? brands.map(({ img, name }, idx) => (
						<SwiperSlide key={idx} className="client-item">
							<div className="client-logo">
								<img
									src={img ? img : "/images/brands/brand-1.webp"}
									alt={name ? name : "Partner brand"}
								/>
							</div>
						</SwiperSlide>
				  ))
				: ""}
		</Swiper>
	);
};

export default BrandSlider1;
