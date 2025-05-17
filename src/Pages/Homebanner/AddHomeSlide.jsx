import React, { useState } from 'react';
import axios from 'axios';
import UploadBox from '../../Components/uploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoClose } from "react-icons/io5";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { postData } from '../../../utils/api';

const AddHomeSlide = () => {
  

  const [preview, setpreview] = useState([]);

  const onchangeInput = (e) => {
    setFormfields({ ...formfields, [e.target.name]: e.target.value });
  };

  const handleSubmitSlide = async (e) => {
    e.preventDefault();
    if (preview.length === 0) {
      alert('Please complete all fields and upload at least one image.');
      return;
    }

    const res = await postData('/api/homeslider/create', {
      images: preview,
    });

    console.log("Submitting images:", preview);


    if (res.success) {
      alert('Slide published successfully');
      
      setpreview([]);

      window.location.href = "/Homeslider/list";
    } else {
      alert('Failed to publish slide');
    }
  };

  return (
    <section className='p-5 bg-[#f1f1f1]'>
      <form className="form" onSubmit={handleSubmitSlide}>
        <div className="scroll max-h-[70vh] overflow-y-scroll">

        
          {/* Image Preview + Upload */}
          <div className="flex flex-wrap grid-cols-8 gap-4">
            {preview?.length > 0 &&
              preview.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[150px] h-[120px] rounded-md overflow-hidden shadow-md border border-gray-300"
                >
                  <LazyLoadImage
                    src={image}
                    alt="slide"
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
                    className="absolute top-1 right-1 w-3 h-3 bg-red-600 text-white rounded-full flex items-center justify-center z-20 shadow-sm hover:bg-red-700"
                  >
                    <IoClose size={12} />
                  </button>
                </div>
              ))}

            <div className="uploadBoxWrapper relative w-[150px] h-[120px]">
              <UploadBox multiple={false} name="slideImage" url="/api/homeslider/upload" setpreview={setpreview} />
            </div>
          </div>
        </div>

        <br />
        <Button type="submit" className="btn-blue btn-sm mt-3 w-full flex gap-3">
          <FaCloudUploadAlt className="text-[25px] text-white" />
          Publish Slide
        </Button>
      </form>
    </section>
  );
};

export default AddHomeSlide;
