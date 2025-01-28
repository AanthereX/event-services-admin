import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./index.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Carousel({ data = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className=" relative py-5">
      <Swiper
        onSlideChange={(e) => {
          setCurrentIndex(e?.activeIndex);
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Pagination]}
        className="mySwiper  !h-[300px]"
      >
        {data.map((photo, index) => {
          return (
            <SwiperSlide>
              <img
                src={photo}
                className="w-[100%] bg-green-4 h-[150px] object-cover rounded-[12px]"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="absolute top-8 bg-c_FFFFFF75   text-white text-fs_14 font-outfit_regular rounded-full px-2 py-1 right-6 z-40">
        {currentIndex + 1} / {data.length}
      </div>
    </div>
  );
}
