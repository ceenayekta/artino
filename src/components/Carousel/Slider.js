
import React from "react";
// Import Swiper React components
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import "./Slider.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination,Navigation]);


export const Slider = ({
  children,
  slidesPerView, 
  spaceBetween, 
  loop, 
  pagination, 
  navigation, 
}) => {
  return (
    <Swiper 
    slidesPerView={slidesPerView} 
    spaceBetween={spaceBetween} 
    loop={loop} 
    pagination={pagination} 
    navigation={navigation} 
    >
    {children}
    </Swiper>
  )
}
