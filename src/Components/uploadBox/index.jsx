import React from 'react'
import { IoImagesOutline } from "react-icons/io5";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const UploadBox = (props) => {
  return (
    <div className='uploadbox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] 
    h-[120px] w-[150px] bg-gray-200 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col relative'>
        <IoImagesOutline className='!text-[40px] opacity-35 pointer-events-none'/>
        <h1 className='text-[16px] pointer-events-none'>upload Image</h1>

        <input type='file' multiple={props.multiple!==undefined?props.multiple:false} className='absolute top-0 left-0 w-full h-full opacity-0'/>
        </div>
  )
}

export default UploadBox