import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectsCarousel = ({ items }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Keyboard, A11y, Parallax]}
      navigation
      pagination={{ clickable: true }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      a11y={{ enabled: true }}
      parallax={true}
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      }}
      speed={500}
    >
      {items.map((item, i) => (
        <SwiperSlide key={i}>
          <a
            href={item.href}
            className="block rounded-xl bg-white dark:bg-gray-900 shadow overflow-hidden focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-40 object-cover"
              data-swiper-parallax="-30"
            />
            <div className="px-3 py-2 text-sm" data-swiper-parallax="-60">{item.title}</div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectsCarousel;
