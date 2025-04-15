import React, { useContext } from 'react'
import { useState,useRef} from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { Mycontext } from '../../App';
import { useEffect } from 'react';
import { editData } from '../../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink, useNavigate } from "react-router-dom";
import  Button  from "@mui/material/Button";
 import TextField from '@mui/material/TextField';
 import { PhoneInput } from 'react-international-phone';
 import 'react-international-phone/style.css';
 import { UpdateData } from '../../../utils/api';
 import ChangePassword from '../ChangePassword';

const Profile = () => {
    const [preview, setpreview] = useState([])
    const [uploading, setuploading] = useState(false)
    const context= useContext(Mycontext)
    const [phone, setPhone] = useState('');


    
    const history = useNavigate()
    const [isLoading,setisLoading] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false);
    const modalRef = useRef(null);


    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowChangePassword(false);
        }
      };
    
      if (showChangePassword) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    
      // Clean up
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showChangePassword]);
    

    
    const [Formfields,setFormfields] =useState({
        name:localStorage.getItem('userName'),
        email:localStorage.getItem('userEmail'),
         mobile: localStorage.getItem('userMobile') || ''
    })
     useEffect(()=>{
        const token = localStorage.getItem('accessToken')
        if (token===null){
            history('/')
        }
 },[context?.isLogin])

     const onChangeInput=(e)=>{
        const {name,value} = e.target;
        setFormfields(()=>{
            return{ 
                ...Formfields,
            [name]:value
        }
           
        })
        
    }
     const valideValue = Object.values(Formfields).every(el=>el);// this ensures untill the fields are empty u cant register
    
     const handleSubmit = (e) => {
        e.preventDefault();
        setisLoading(true);

        if (Formfields.mobile === "") {
            context.openAlertBox("error", "Please enter a phone number.");
            setisLoading(false);
            return;
        }

        // Only update mobile number in DB
        UpdateData("/api/users/profile", { mobile: Formfields.mobile })
            .then((res) => {
                if (res?.success) {
                    context.openAlertBox("success", "Profile updated successfully!");
                    localStorage.setItem('userMobile', Formfields.mobile);
                    setFormfields({ ...Formfields}); // Reset mobile field
                    
                   
                } else {
                    context.openAlertBox("error", res?.message || "Update failed! Try again.");
                }
            })
            .catch(() => {
                context.openAlertBox("error", "Network error! Please try again.");
            })
            .finally(() => {
                setisLoading(false);
            });
    };

    let img_array=[];
    let uniqueArray =[];
    let selectedImages=[]

    useEffect(() => {
        const savedAvatar = localStorage.getItem("userAvatar");
        if (savedAvatar) {
          setpreview([savedAvatar]);
        }
        // If context.res.avatar exists, it would override localStorage
        if (context?.res?.avatar) {
          setpreview([context.res.avatar]);
          
        }
      //   if (!context?.res?.avatar) {
      //      localStorage.removeItem("userAvatar");
      //      setpreview([])
      // }
      }, [context?.res?.avatar]);

      const onChangeFile=async(e,apiEndPoint)=>{
        try {
             setpreview([])
             setuploading(true) 
             const  files = e.target.files

             for(var i=0; i<files.length;i++){
                  if(files[i] &&(
                       files[i].type==="image/jpeg" ||
                       files[i].type==="image/jpg"  ||
                       files[i].type==="image/png"  ||
                       files[i].type==="image/webp"

                  )){
                       const file = files[i];
                       const formdata = new FormData()
                       selectedImages.push(file);
                       formdata.append('avatar',file)

                       editData("/api/users/user-avatar",formdata).then((res)=>{
                            setuploading(false)
                            console.log("Full response:", res); // Check  full response
                            console.log("Avatar URL:", res?.avatar); // Check if avatar exists
                                  
                            if (res?.avatar) {
                                 localStorage.setItem("userAvatar", res.avatar);
                                 setpreview([res.avatar]);
                                  setUserAvatar(res.avatar);
                             } else {
                                 console.error("Avatar URL is missing from the response");
                             }
                            let avatar=[];
                            avatar.push(res?.avatar)
                            setpreview(avatar)
                            console.log(res);
                       })
                        

                  }else{
                       context.openAlertBox("error", "please enter a valid jpg,jpeg or webp files")
                       setuploading(false)

                  }
             }
             console.log(files)
        } catch (error) {
           console.log(error)  
        }
   }
      
  return (
    <>
    <div className='card flex items-center w-[75%] my-4 mt-4 shadow-md rounded-md h-auto bg-white'>
       <div className="w-full p-3 flex-items  justify-center flex-col">

        <div className='flex justify-between'>
          <h2 className='font-[600] text-[16px] ml-2'>User Profile</h2>
        
        <Button variant="contained" color="error" onClick={() => setShowChangePassword(!showChangePassword)} className="mt-4">
                        Change Password
                    </Button>
                   
</div>
        
        <br/>
        

        <div className="w-[110px] h-[110px] rounded-full 
overflow-hidden mb-4 relative group ml-3 !flex items-center !justify-center !bg-gray-400">
            {uploading === true ? (
  <CircularProgress color="inherit" />
) : (
  preview?.length !== 0 ?
  preview?.map((map, index) => {
    return (
      <img
        key={index} 
        src={map}
        alt={`Avatar ${index}`} 
        className="w-full h-full object-cover"
      />
    );
  }) :
  <img
       
        src={"User/user.png"} // Use map as the image URL
        className="w-full h-full object-cover"
      />
)}
   <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] 
 flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
 <FaCloudUploadAlt className="text-[#fff] !text-[22px]"/>
 <input type="file" 
 className="absolute top-0 left-0 w-full h-full opacity-0"
 accept="image/*"
 onChange={(e)=>{
  onChangeFile(e, "api/users/user-avatar")
 }}
  name="avatar"/>
 </div>
</div>

<form className="mt-10 h-full w-full" onSubmit={handleSubmit}>
            <div className="flex items-center gap-5 !mb-3">
                <div className="w-[50%] !mb-2">
                <TextField 
                
                label="Full Name" 
                variant="outlined" 
                size="small"
                name="name"
                value={Formfields.name}
                disabled={isLoading===true ? true :false}
                onChange={onChangeInput} 
                className='w-[70%] bg-gray-200'/>
                </div>
 
                <div className="w-[50%] !mb-2">
                <TextField 
                type="email"
                label="Email" 
                variant="outlined" 
                size="small"
                name="email"
                value={Formfields.email}
                disabled={isLoading===true ? true :false}
                onChange={onChangeInput}
                className='w-[70%] bg-gray-200'/>
                </div>

                

            </div>
            
            <div className="w-[50%] !mb-2">
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
  className="!w-[68%]"
/>

                </div>

                <br/>
                <div className="flex gap-4">
 <button 
        type="submit" 
        disabled={!valideValue} 
        className={`flex items-center justify-center gap-2 font-[400] !text-center !mt-5 bg-red-400 text-white rounded-lg shadow-lg !w-[150px] !h-[40px] mb-3
          transition-all duration-300 ease-in-out 
          ${valideValue ? "hover:bg-black hover:shadow-xl" : "opacity-70"}`}
      >
        {isLoading && <CircularProgress color="inherit" className="!w-[20px] !h-[20px]" />} 
        Update Profile
      </button>
</div>
</form>
</div>



    </div>

    {showChangePassword && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div
      ref={modalRef}
      className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative"
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setShowChangePassword(false)}
      >
       
      </button>
      <ChangePassword onClose={() => setShowChangePassword(false)} />
    </div>
  </div>
)}

  </>)
}

export default Profile