import React from 'react'
import UploadBox from '../../Components/uploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoClose } from "react-icons/io5";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";


const AddHomeSlide = () => {
  return (
    <section className='p-5 bg-[#f1f1f1]'>
    <form className='form '>
   <div className=' scroll'>
   <div className='grid grid-cols-8 gap-4'>
  
  <div className="uploadBoxWrapper relative w-[150px] h-[120px]">
  <span className='absolute w-[15px] h-[15px] rounded-full overflow-hidden -top-1 -right-1 bg-red-700
    flex items-center justify-center z-10 text-white cursor-pointer'>
    <IoClose />
  </span>
<div className="uploadbox w-full h-full p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] bg-gray-200 cursor-pointer hover:bg-gray-300 relative">
  <LazyLoadImage
    src="/f7.jpg"
    alt="image"
    effect="blur"
    className="w-full h-full object-cover"
    wrapperProps={{
      style: { height: '100%', width: '100%' }, 
    }}
  />
</div>
</div>




<div className="uploadBoxWrapper relative w-[150px] h-[120px]">
  <span className='absolute w-[15px] h-[15px] rounded-full overflow-hidden -top-1 -right-1 bg-red-700
    flex items-center justify-center z-10 text-white cursor-pointer'>
    <IoClose />
  </span>
<div className="uploadbox w-full h-full p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] bg-gray-200 cursor-pointer hover:bg-gray-300 relative">
  <LazyLoadImage
    src="/f7.jpg"
    alt="image"
    effect="blur"
    className="w-full h-full object-cover"
    wrapperProps={{
      style: { height: '100%', width: '100%' }, 
    }}
  />
</div>
</div>


<div className='uploadBoxWrapper relative w-[150px] h-[120px]'>
  <UploadBox multiple={true} />
</div>
</div>
    </div>

      <hr className="border-t border-gray-800 mt-3" />
    
     <br/>
     <div className='w-[250px]'>
    <Button type="submit" className='btn-blue btn-sm mt-3 w-full flex gap-3'>
    <FaCloudUploadAlt  className='text-[25px] text-white'/>
    Publish and View</Button>
    </div>
    </form>
    </section>
  )
}

export default AddHomeSlide