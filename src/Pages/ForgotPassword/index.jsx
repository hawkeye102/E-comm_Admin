import { Button } from '@mui/material'
import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { MdOutlineLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaSquareInstagram } from "react-icons/fa6";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const ForgetPassword = () => {
    const [loadinggoogle, setLoadinggoogle] = React.useState(false);
    const [loadingInsta, setLoadingInsta] = React.useState(false);
    const [isPassword,setIsPassword] = React.useState(false);
    function handleClickGoogle() {
        setLoadinggoogle(true);
    }

    function handleClickInsta() {
      setLoadingInsta(true);
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
  
         
  <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 w-full max-w-lg px-4">

  <div className="bg-white bg-opacity-90 shadow-md rounded-full p-4 w-[60px] h-[60px] flex items-center justify-center">
    <img
      src="/logo1.png"
      className="w-[50px] h-[50px] rounded-full"
      alt="Logo"
    />
  </div>

  <h2 className="text-lg font-semibold text-black leading-snug">
   Having trouble to sign in?
    <div className="text-sm font-normal text-red-700">
      Reset your password
    </div>
  </h2>

        <br/>

       

        <form className='w-full max-w-md px-4'>
        <div className='form-group mt-2 w-full h-full'>
          <h4>Email</h4>
          <input
  type='email'
  className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.2)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-4 text-[16px]'
  placeholder='Enter your Email'
/>

        </div>

       
        <br/>
        <div className='flex items-center justify-center w-full rounded-md'>
        <Button className='btn-blue w-full'>Reset Password</Button>
        </div>

        <div className='form-group mt-2 flex items-center justify-between gap-2'>
        <span>Don't want to reset? </span>
        <Link to="/forgot-password" className='text-blue-700 font-[600] text-[16px] hover:underline'>Sign in?</Link>
        </div>
      </form>

      

</div>
         
 </div>
      </section>
    );
  };
  
  export default ForgetPassword;
  
