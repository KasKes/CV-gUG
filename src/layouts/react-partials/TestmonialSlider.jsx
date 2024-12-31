import React from "react";
import Star from "@/layouts/icons/Star";
import TestmonialItem from "@/layouts/react-partials/Testmonial";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import DynamicIcon from "@/helpers/DynamicIcon";

const Testmonial = ({ testimonials, className }) => {
  return (
    <div>
      <Swiper
        modules={[Pagination, Autoplay]}
        className={`testimonial-slider${className ? ` ` + className : ""}`}
        spaceBetween={50}
        loop={true}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: true,
        }}
        pagination={{ clickable: true }}
        slidesPerView={2}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}>
        {testimonials.slice(0, 4).map((item, index) => (
          <SwiperSlide key={index}>
            <TestmonialItem
              image={item.image}
              link={item.link}
              name={item.name}
              content={item.content}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testmonial;
