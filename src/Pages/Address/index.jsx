import React, { useContext } from 'react'
import UploadBox from '../../Components/uploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoClose } from "react-icons/io5";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';
 import { PhoneInput } from 'react-international-phone';
 import Select from '@mui/material/Select';
 import MenuItem from '@mui/material/MenuItem';
 import { postData } from '../../../utils/api';
 import { Mycontext } from '../../App';

const  AddAddress= () => {
  const context = useContext(Mycontext)

     const [phone, setPhone] = useState('');
     const [Formfields,setFormfields] =useState({
             address_line:'',
             city:'',
             mobile: localStorage.getItem('userMobile') || '',
             state:'',
             pincode:'',
             country:'',
             status:'',
             userId:''
         })


         const [status, setstatus] = React.useState(false);
         const [isLoading,setisLoading] = useState(false)

         const handleChangeStatus = (event) => {
          const value = event.target.value === 'true' || event.target.value === true;
          setstatus(value);
          setFormfields((prev) => ({
            ...prev,
            status: value,
          }));
        };
        

         
          const onChangeInput=(e)=>{
            const {name,value} = e.target;
            setFormfields(()=>{
                return{ 
                    ...Formfields,
                [name]:value
            }
               
            })
            
        }
        console.log("Access token from localStorage:", localStorage.getItem("accessToken"));


            const handleSubmit = (e) => {
                  e.preventDefault();
                  setisLoading(true);

                 

                  if (Formfields.mobile === "") {
                    context.openAlertBox("error", "Please enter a phone number.");
                    setisLoading(false);
                    return;
                }
          
                  if (Formfields.address_line === "") {
                      context.openAlertBox("error", "Please enter a Address line.");
                      setisLoading(false);
                      return;
                  }

                  if (Formfields.city === "") {
                    context.openAlertBox("error", "Please enter city name.");
                    setisLoading(false);
                    return;
                }

                if (Formfields.pincode === "") {
                    context.openAlertBox("error", "Please enter pincode.");
                    setisLoading(false);
                    return;
                }

                if (Formfields.state === "") {
                    context.openAlertBox("error", "Please enter state name.");
                    setisLoading(false);
                    return;
                }

                if (Formfields.country === "") {
                    context.openAlertBox("error", "Please enter  country name.");
                    setisLoading(false);
                    return;
                }
         
                  
          
                 
                  postData("/api/address/add", Formfields)
                      .then((res) => {
                        console.log("Access token from localStorage:", localStorage.getItem("accessToken"));

                          if (res?.success) {
                              context.openAlertBox("success", "Address updated successfully!");
                              localStorage.setItem('userMobile', Formfields.mobile);
                             
                              
                             context?.setisScreenPanelopen({
                                open:false
                             })
                          } else {
                              context.openAlertBox("error", res?.message || "Update failed! Try again.");
                          }
                      })
                      .catch((err) => {
                        console.error("Caught error in .catch:", err);
                        context.openAlertBox("error", err.message || "Network error! Please try again.");
                      })
                      
                     
                      .finally(() => {
                          setisLoading(false);
                      });
              };
  return (
    <section className='p-5 bg-[#f1f1f1]'>
    <form className='form' onSubmit={handleSubmit}>
   
   <div className=' scroll max-h-[70vh] ml-2 mr-2'>
    <div className='grid grid-cols-2 gap-2'>
    <div className='mb-3 w-full'>
      <h1 className='text-[18px] font-bold mb-2'>Address Line 1</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]' name="address_line" onChange={onChangeInput} value={Formfields.address_line}/>
    </div>
    <div className='mb-3 w-full'>
      <h1 className='text-[18px] font-bold mb-2'>City</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]' name="city" onChange={onChangeInput} value={Formfields.city}/>
    </div>
    </div>

    <div className='grid grid-cols-3 gap-2'>
    <div className='mb-3 w-full'>
      <h1 className='text-[18px] font-bold mb-2'>State</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'name="state" onChange={onChangeInput} value={Formfields.state}/>
    </div>
    <div className='mb-3 w-full'>
      <h1 className='text-[18px] font-bold mb-2'>Pin Code</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'name="pincode" onChange={onChangeInput} value={Formfields.pincode}/>
    </div>
    <div className='mb-3 w-full'>
      <h1 className='text-[18px] font-bold mb-2'>Country</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'name="country" onChange={onChangeInput} value={Formfields.country}/>
    </div>
    </div>

    <div className='grid grid-cols-3 gap-2 bg-none'>
    <div className='mb-3 w-full'>
      <h1 className='text-[18px] font-bold mb-2'>Mobile</h1>
     <PhoneInput
       defaultCountry="in"
       onChange={(phone) => {
         setPhone(phone);
         setFormfields((prev) => ({
           ...prev,
           mobile: phone,
         }));
       }}
       value={Formfields.mobile}
       disabled={isLoading === true}
       className=""
     />
    </div>
    <div className='mb-3 w-full'>
    <h1 className='text-[18px] font-bold mb-2'>Status</h1>
        <Select
          value={Formfields.status}
          onChange={handleChangeStatus}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          size='small'
          className='w-full'
        >
         
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
         
        </Select>
        
    </div>
    </div>

   
 <br/>
  
  
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

export default AddAddress