import React, { useContext } from 'react'
import UploadBox from '../../Components/uploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoClose } from "react-icons/io5";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';
import { Mycontext } from '../../App';
import {postDataCategory } from '../../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDataFromApi } from '../../../utils/api';
import { useEffect } from 'react';

const  AddCategory1 = () => {
  const [catdata,setCatdata]=useState([])
  const [uploading, setuploading] = useState(false)
   const [isLoading,setisLoading] = useState(false)
  const [formfields,setFormfields] =useState({
         name:'',
         images:[],
  })

  const context=useContext(Mycontext)
 const [preview, setpreview] = useState([])

const  onchangeInput=(e)=>{
   const{name,value}=e.target
     setFormfields((e)=>{
        return{
        ...formfields,
        [name]:value
        }
        })
        }

  

   const handleSubmit=(e)=>{
   
      e.preventDefault();
      setisLoading(true);
      


      if (formfields.name ==="") {
        context.openAlertBox("error", "Please enter a category name.");
        setisLoading(false);
        return;
    }

    if (preview?.length===0) {
      context.openAlertBox("error", "Please select a category image to upload.");
      setisLoading(false);
      return;
  }
  console.log('formfields:', formfields);
  console.log('preview:', preview);

const dataToSend = {
  name:formfields.name,
  images: preview[0], 
};
console.log('the value',dataToSend)
postDataCategory('/api/category/create', dataToSend).then((res) => {
  setisLoading(false);
  context.setisScreenPanelopen({ open: false });
});
  }

  
  return (
 <section className='p-5 bg-[#f1f1f1]'>
    <form className='form' onSubmit={handleSubmit}>
      <div className='scroll max-h-[70vh] overflow-y-scroll'>
        <div className='grid grid-cols-1'>
          <div className='mb-3 w-[38%]'>
            <h1 className='text-[18px] font-bold mb-2'>Category Name</h1>
            <input
              type='text'
              name='name'
              value={formfields.name}
              onChange={onchangeInput}
              className='plane w-full h-[40px] rounded-sm border
               border-[rgba(0,0,0,0.2)] focus:outline-none p-3 
               focus:border-[rgba(0,0,0,0.9)]'
            />
          </div>
        </div>
        <br />
        <h1 className='text-[16px] font-bold mb-2'>Category Image</h1>
        <div className='flex flex-wrap gap-4'>

          {preview?.length !== 0 &&
            preview.map((image, index) => (
              <div key={index} className="relative w-[150px] h-[120px] 
              rounded-md overflow-hidden shadow-md border border-gray-300">
  <LazyLoadImage
    src={image}
    alt="category preview"
    effect="blur"
    className="w-full h-full object-cover"
  />
  <button
    type="button"
    onClick={() => {
      const newPreview = [...preview];
      newPreview.splice(index, 1);
      setpreview(newPreview);
    }}
    className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center z-20 shadow-sm hover:bg-red-700"
  >
    <IoClose size={12} />
  </button>
</div>

            ))}
          <div className='uploadBoxWrapper relative w-[150px] h-[120px]'>
            <UploadBox
              multiple={true}
              name="images"
              url="/api/category/upload"
              setpreview={setpreview}
            />
          </div>
        </div>
        <hr className="border-t border-gray-800 mt-3" />
        <br />
        <div className='w-[250px]'>
          <Button type="submit" className='btn-blue btn-sm mt-3 w-full flex gap-3'>
            {
              isLoading===true ? <CircularProgress color='inherit'/>:
             
             <><FaCloudUploadAlt className='text-[25px] text-white' /> Publish and View</> 
           
            }
            
          </Button>
        </div>
      </div>
    </form>
    
  </section>
);
};
   


export default AddCategory1