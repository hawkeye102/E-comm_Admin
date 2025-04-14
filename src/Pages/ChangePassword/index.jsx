import { Button } from '@mui/material'
import React, { useContext, useState } from "react";
import {Link, NavLink} from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaSquareInstagram } from "react-icons/fa6";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Mycontext } from '../../App';
import {useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../../utils/api';

const ChangePassword = () => {
   
    const [isPassword,setIsPassword] = React.useState(false);
    const [isPassword2,setIsPassword2] = React.useState(false);
    const [isLoading,setisLoading] = useState(false)

    const [Formfields,setFormfields] =useState({
           
      email:localStorage.getItem("userEmail"),
     newpassword:'',
     confirmpassword:''
  })
  console.log('mail is found',localStorage.getItem("userEmail"))
        const context=useContext(Mycontext)
            const history=useNavigate()


            const onChangeInput=(e)=>{
              const {name,value} = e.target;
              setFormfields(()=>{
                  return{ 
                      ...Formfields,
                  [name]:value
              }
                 
              })
          }
          
              const handleSubmit=(e)=>{
              
                      e.preventDefault();
                      setisLoading(true);
                     
              
                      if(Formfields.newpassword===""){
                          setisLoading(false);
                          context.openAlertBox("error","please enter  password")
                          
                      return;
                      }
              
                      if(Formfields.confirmpassword===""){
                          setisLoading(false)
                          context.openAlertBox("error","please enter confirm password")
                          
                          return;
                      }
                      if(Formfields.newpassword!==Formfields.confirmpassword){
                          setisLoading(false)
                          context.openAlertBox("error","password doesn't match")
                         
                          return;
                      }
                      
                      postData("/api/users/reset-password",Formfields).then((res)=>{
                          console.log(res)
                          if (res?.message) {  
                            context.openAlertBox("success", "Password Updated Successfully!");
      
                          history('/login')
               } })
                  }
   
  
    return (
      <section className="relative w-full h-screen">
        {/* Fixed Header */}
        <header className="w-full fixed top-3 left-0 flex items-center justify-between z-50">
          <Link to="/">
            <img
              src="/logo1.png"
              className="w-[60px] h-[60px] rounded-full ml-5"
            />
          </Link>
  
          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full px-2 py-2 text-white flex items-center gap-2 transition-all duration-200"
                  : "rounded-full px-4 py-2 bg-[#f1f1f1] text-[rgba(0,0,0,0.9)] flex items-center gap-2 transition-all duration-200"
              }
            >
              <Button className="!flex gap-2 !bg-[#f1f1f1] !text-black !font-bold !rounded-full">
                <MdOutlineLogin className="!font-bold" />
                Login
              </Button>
            </NavLink>
  
            <Button className=" !mr-7 !text-[rgba(0,0,0,0.9)] flex gap-2">
              <FaUserPlus className="!font-bold" />
              Sign Up
            </Button>
          </div>
        </header>
  
        {/* Background Image and Centered Logo */}
        <div className="relative w-full h-full">
          <img
            src="/dia.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-80"
          />
  
         
          <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 flex flex-col items-center  space-y-3">
  <div className="bg-white bg-opacity-90 shadow-md rounded-full p-4 w-[60px] h-[60px] flex items-center justify-center">
    <img
      src="/logo1.png"
      className="w-[50px] h-[50px] rounded-full"
      alt="Logo"
    />
  </div>

  <h2 className="text-lg font-semibold text-black leading-snug">
    Welcome Back
    <div className="text-sm font-normal text-red-700">
     Change your password from here
    </div>
  </h2>

 

        <br/>

       
        <form className='w-full flex flex-col items-center px-8'onSubmit={ handleSubmit}>
        <div className='form-group mt-2 w-[400px] mb-3'>
          <h4> New Password</h4>
          <div className="relative">
          <input type={isPassword===false?'password':'text'} 
          className='w-full h-[40px] border-2 rounded-md border-[rgba(0,0,0,0.1)] 
          focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
          name="newpassword"
          value={Formfields.newpassword}
          disabled={isLoading===true ? true :false}
          onChange={onChangeInput} />
          <Button className='!absolute top-1/2 right-2 -translate-y-1/2 !rounded-full !w-[30px] !h-[30px] !min-w-[30px] !bg-transparent !p-0'
       onClick={()=>setIsPassword(!isPassword)}>   
      {isPassword===true ? <FaRegEye className='text-black'/> :<FaEyeSlash className='text-black'/>}
          
          </Button>
          </div>
        </div>

        <div className='form-group mt-2 w-[400px] mb-3'>
          <h4> Confirm Password</h4>
          <div className="relative">
          <input type={isPassword2===false?'password':'text'} 
          className='w-full h-[40px] border-2 rounded-md border-[rgba(0,0,0,0.1)] 
          focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
          name="confirmpassword"
          value={Formfields.confirmpassword}
          disabled={isLoading===true ? true :false}
          onChange={onChangeInput}/>
          <Button className='!absolute top-1/2 right-2 -translate-y-1/2 !rounded-full !w-[30px] !h-[30px] !min-w-[30px] !bg-transparent !p-0'
       onClick={()=>setIsPassword2(!isPassword2)}>   
      {isPassword2===true ? <FaRegEye className='text-black'/> :<FaEyeSlash className='text-black'/>}
          
          </Button>
          </div>
        </div>

        
        <div className='flex items-center justify-center w-full rounded-md gap-3'>
        <button 
                                  type="submit" 
                                  // disabled={!valideValue} 
                                  className={`flex items-center justify-center gap-2 font-[400] !text-center !mt-5 bg-red-400 text-white rounded-lg shadow-lg !w-full !h-[40px] mb-3
                                    transition-all duration-300 ease-in-out 
                                   "hover:bg-black hover:shadow-xl"}`}
                                >
                                  {isLoading && <CircularProgress color="inherit" className="!w-[20px] !h-[20px]" />} 
                                  Change Password
                                </button>
        </div>
      </form>

      

</div>
         
 </div>
      </section>
    );
}
  
  export default ChangePassword;
  
