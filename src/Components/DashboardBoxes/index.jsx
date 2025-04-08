import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiGift } from "react-icons/fi";
import { IoStatsChartSharp } from "react-icons/io5";
import { HiOutlineChartPie } from "react-icons/hi2";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";

import{Navigation} from 'swiper/modules'
const Dashboardbox = () => {
  return (
    <>
    <div className='relative w-full'><Swiper
    slidesPerView={4}
    spaceBetween={10}
    navigation={true}
    modules={[Navigation]}
    className="mySwiper"
  >
    <SwiperSlide>
        <div className='  box  bg-white p-4 rounded-md border border-[rgba(0,0,0,0.1)]
         !flex !items-center gap-3 cursor-pointer hover:bg-[#f1f1f1]'>
        <FiGift className='text-[22px] text-[#3872fa]' />
          <div className='!w-[60%]  !items-center gap-3'>
           <h1> New Orders</h1>
           <b>1,399</b>
          </div>
          <div>
          <IoStatsChartSharp className='text-[50px] text-[#3872fa]'/>
          </div>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className=' box  bg-white p-4 rounded-md border border-[rgba(0,0,0,0.1)]
         !flex !items-center gap-3 cursor-pointer hover:bg-[#f1f1f1]'>
        < HiOutlineChartPie className='text-[30px] text-[#10b981]' />
          <div className='!w-[60%]  !items-center gap-3'>
           <h1>Sales</h1>
           <b>109,399</b>
          </div>
          <div>
          <IoStatsChartSharp className='text-[50px] text-[#10b981]'/>
          </div>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className=' box  bg-white p-4 rounded-md border border-[rgba(0,0,0,0.1)]
         !flex !items-center gap-3 cursor-pointer hover:bg-[#f1f1f1]'>
        < BsBank className='text-[22px] text-[#7928ca]' />
          <div className='!w-[60%]  !items-center gap-3'>
           <h1>Revenue</h1>
           <b>57,399</b>
          </div>
          <div>
          <IoStatsChartSharp className='text-[50px] text-[#7928ca]'/>
          </div>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className=' box   bg-white p-4 rounded-md border border-[rgba(0,0,0,0.1)]
         !flex !items-center gap-3 cursor-pointer hover:bg-[#f1f1f1]'>
        <RiProductHuntLine className='text-[28px] text-[#f36e79]' />
          <div className='!w-[60%]  !items-center gap-3'>
           <h1>Total Products</h1>
           <b>1,399</b>
          </div>
          <div>
          <IoStatsChartSharp className='text-[50px] text-[#f36e79]'/>
          </div>
        </div>
    </SwiperSlide>
    
  </Swiper>
  </div>
    </>  
  )
}

export default Dashboardbox