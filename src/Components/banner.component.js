import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination,Autoplay } from "swiper";




export default function Banner() {

  const [banner, setBanner] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=75fad9cfac3b9809bd8f47fa6494c99c&language=en-US&page=1`)
      .then((response) => {
        setBanner(response.data.results);
        console.log(banner);
      })
  }, [])

  


  return (
    <>
    {
      (banner.length>0) ?   
      <Swiper
      loop={true}
      autoplay={{
        delay:2500,
        disableOnInteraction: false
      }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        
        {
          banner.map((movie)=>(
            <SwiperSlide key={movie.id}>
              <div className={`bg-[url(https://image.tmdb.org/t/p/original${movie.backdrop_path})] flex justify-center items-end w-full h-full bg-cover bg-center`}>
                  <div className='bg-slate-500 md:h-10 h-8 opacity-70 text-medium md:text-4xl text-white w-full mb-4'>{movie.title}</div>
              </div>
              </SwiperSlide>
          ))
        }
        
     
</Swiper>
          :   <div className='flex justify-center'>
          <ThreeDots 
          width="50"
          color='grey'
          ariaLabel='loading'
          /> 
      </div>
    }

    </> 
  )
}
