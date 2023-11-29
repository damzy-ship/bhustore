import React from 'react';
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {sliderImages} from '../../utils/images';

import Slider from "react-slick";


const ImgSlider = () => {
  const settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    infinite: true,
    speed: 1000,
    fade: true,
    slide: 'div',
    cssEase: 'linear'
  };

  return (
    <Slider {...settings} className = "hero-slider">
      {sliderImages &&
        sliderImages.map((img)=>
        <div className='hero-slider-item'>
        <img src = {img} alt = "" />
        </div>)
      }
      
    </Slider>
  )
}

export default ImgSlider