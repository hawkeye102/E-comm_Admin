import React, { useContext } from 'react'
import { IoImagesOutline } from "react-icons/io5";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useState } from 'react';
import { Mycontext } from '../../App';
import { UploadImages } from '../../../utils/api';

//TODO : IMAGE DELETION FROM CLOUDINARY NOT JUST FROM PREVIEW

const UploadBox = (props) => {
   const [preview, setpreview] = useState([])
      const [uploading, setuploading] = useState(false)
      
      const context=useContext(Mycontext)
      let selectedImages=[]
      const onChangeFile = async (e, apiEndPoint) => {
        try {
          setpreview([]);
          setuploading(true);
      
          const selectedFiles = Array.from(e.target.files);
          console.log("Selected Files:", selectedFiles);
          const validImages = selectedFiles.filter((file) =>
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)
          );
      
          if (validImages.length === 0) {
            context.openAlertBox("error", "Please upload only jpg, jpeg, png or webp images.");
            setuploading(false);
            return;
          }
          
          
          const res = await UploadImages(apiEndPoint, validImages); 
      
          setuploading(false);
      
          if (res?.imageUrl) {
            props.setpreview((prevPreview) => [...prevPreview, res.imageUrl]);
          } else {
            console.error("No image URL returned in response");
          }
          
        } catch (error) {
          console.error("Upload Error:", error);
          setuploading(false);
        }
      };
      
  return (
    <div className='uploadbox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] 
    h-[120px] w-[150px] bg-gray-200 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col relative'>
        <IoImagesOutline className='!text-[40px] opacity-35 pointer-events-none'/>
        <h1 className='text-[16px] pointer-events-none'>upload Image</h1>

        <input type='file'accept="image/*"
 onChange={(e)=>{
  onChangeFile(e, props?.url)
 }} 
 name={props.name}
 multiple={props.multiple!==undefined?props.multiple:false} 
 className='absolute top-0 left-0 w-full h-full opacity-0'/>
        </div>
  )
}

export default UploadBox