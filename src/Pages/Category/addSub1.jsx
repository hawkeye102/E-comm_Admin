import React from 'react'
import UploadBox from '../../Components/uploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoClose } from "react-icons/io5";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from '@mui/material/Select';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';


const  AddSubCategory1 = () => {
  const [Productcat, setProductcat] = React.useState('');
  const handleChangeProduct = (event) => {
    setProductcat(event.target.value);
  }

  return (
    <section className='p-5 bg-[#f1f1f1]'>
    <form className='form '>
   
   <div className=' scroll max-h-[70vh]'>
  <div className=' grid grid-cols-4 mb-3 gap-4'>
         <div className='col'>
       <h1 className='text-[16px] font-bold mb-2'>Category Name</h1>
       <Select
           labelId="demo-simple-select-label"
           id="Product-category"
           value={Productcat}
           label="Categroy"
           onChange={ handleChangeProduct}
           className='w-full'
           size='small'
         >
           <MenuItem value={null}>None</MenuItem>
           <MenuItem value={10}>Electronics</MenuItem>
           <MenuItem value={20}>Sports</MenuItem>
           <MenuItem value={30}>Fashion </MenuItem>
         </Select>
     </div>
 
    
   
    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Sub Category Name</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>
    </div>
    </div>

      
    
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

export default AddSubCategory1