import React from 'react'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/uploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoClose } from "react-icons/io5";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";



const AddProducts = () => {
    const [Productcat, setProductcat] = React.useState('');
    const [ProductSubcat, setProductSubcat] = React.useState('');
    const [ProductFeatured, setProductFeatured] = React.useState('');
    const [ProductRams, setProductRams] = React.useState('');
    const [ProductWeight, setProductWeight] = React.useState('');
    const [ProductSize, setProductSize] = React.useState('');


  const handleChangeProduct = (event) => {
    setProductcat(event.target.value);
  }

  const handleChangeSubProduct = (event) => {
    setProductSubcat(event.target.value);
  }

  const handleChangeFeatured = (event) => {
    setProductFeatured(event.target.value);
  }

  const handleChangesetProductRams = (event) => {
    setProductRams(event.target.value);
  }

  const handleChangesetProductWeight = (event) => {
    setProductWeight(event.target.value);
  }
  const handleChangesetProductSize = (event) => {
    setProductSize(event.target.value);
  }
  return (
   <section className='p-5 bg-[#f1f1f1]'>
   <form className='form '>
  <div className=' scroll max-h-[70vh] overflow-y-scroll'>
    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Product Name</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>

    <div className='grid grid-cols-1 mb-3'>
        <div>
      <h1 className='text-[16px] font-bold mb-2'>Product Description</h1>
      <textarea type='text' className='plane w-full  h-[80px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>

    <div className=' grid grid-cols-4 mb-3 gap-4'>
        <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Category</h1>
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

    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Sub Category</h1>
      <Select
          labelId="demo-simple-select-label"
          id="Product-sub-category"
          value={ProductSubcat}
          label="Sub-Categroy"
          onChange={handleChangeSubProduct}
          className='w-full'
          size='small'
        >
          <MenuItem value={null}>None</MenuItem>
          <MenuItem value={10}>Men</MenuItem>
          <MenuItem value={20}>Women</MenuItem>
          <MenuItem value={30}>Kids</MenuItem>
        </Select>
    </div>

    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Product Price</h1>
      <input type='number' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>

    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Product Old Price</h1>
      <input type='number' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>


    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Is Featured?</h1>
      <Select
          labelId="demo-simple-select-label"
          id="Product-sub-category"
          value={ProductFeatured}
          label="Sub-Categroy"
          onChange={handleChangeFeatured}
          className='w-full'
          size='small'
        >
          
          <MenuItem value={10}>True</MenuItem>
          <MenuItem value={20}>False</MenuItem>
         
        </Select>
    </div>

    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Product Stock</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>


    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Brand</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>

    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'> Product Discount</h1>
      <input type='number' className='plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>

    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Rams</h1>
      <Select
          labelId="demo-simple-select-label"
          id="Product-Rams"
          value={ProductRams}
          label="Sub-Categroy"
          onChange={handleChangesetProductRams}
          className='w-full'
          size='small'
        >
          
          <MenuItem value={'6GB'}>6GB</MenuItem>
          <MenuItem value={'8GB'}>8GB</MenuItem>
          <MenuItem value={'10GB'}>10GB</MenuItem>
        </Select>
    </div>

    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Weight</h1>
      <Select
          labelId="demo-simple-select-label"
          id="Product-Rams"
          value={ProductWeight}
          label="Sub-Categroy"
          onChange={handleChangesetProductWeight}
          className='w-full'
          size='small'
        >
          <MenuItem value={null}>None</MenuItem>
          <MenuItem value={'1KG'}>1KG</MenuItem>
          <MenuItem value={'3KG'}>3KG</MenuItem>
          <MenuItem value={'5KG'}>5KG</MenuItem>
        </Select>
    </div>

    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Size</h1>
      <Select
          labelId="demo-simple-select-label"
          id="Product-Size"
          value={ProductSize}
          label="Sub-Categroy"
          onChange={handleChangesetProductSize}
          className='w-full'
          size='small'
        >
          
          <MenuItem value={'s'}>s</MenuItem>
          <MenuItem value={'M'}>M</MenuItem>
          <MenuItem value={'L'}>L</MenuItem>
          <MenuItem value={'XL'}>XL</MenuItem>
          <MenuItem value={'XXL'}>XXL</MenuItem>
        </Select>
    </div>

   

    <div className='grid grid-cols-1'>
    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'> Product Ratings</h1>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
    </div>
    </div>

    </div>

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
   
    <hr className="border-t border-gray-800" />

 <br/>
<Button type="submit" className='btn-blue btn-sm mt-3 w-full flex gap-3'>
<FaCloudUploadAlt  className='text-[25px] text-white'/>
Publish and View</Button>
   </form>
   </section>
  )
}

export default AddProducts