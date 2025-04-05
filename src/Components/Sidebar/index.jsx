import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaProductHunt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoBagCheck } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import {Collapse} from 'react-collapse';


const Sidebar = () => {
  const [submenuIndex,setSubmenuIndex]=useState()
   const isOpensubmenu=(index)=>{
    if(submenuIndex===index){
      setSubmenuIndex(null)
    }else{
      setSubmenuIndex(index)
    }
    
   }
  return (
    <div className='sidebar fixed top-0 left-3 right-2 bg-[#fff] w-[16%] h-full border-r 
    border-[rgba(0,0,0,0.1)] py-3 px-3'>
      <div className='py-2 w-full'>
        <Link to="/"><img src='data:image/jpeg;base64,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' className='w-[120px] object-cover rounded-md'/></Link>
      </div>

      <ul>
        <li>
          <Button className='!justify-start !capatalize gap-3 !text-black !font-[500] !py-2' >
          <div className="flex items-center gap-3">
          <span><RxDashboard className='!text-[18px]'/></span>
         <span>Dashboard</span> 
          </div>
          </Button>
          </li>

          <li>
          <Button className='!flex items-center justify-start !py-2 !capatalize gap-3 !text-black !font-[500]' onClick={()=>isOpensubmenu(1)} >
          <div className="flex items-center gap-3">
          <FaRegImage  className='!text-[18px]'/>
         <span>Home Slides</span> 
          <span className='flex items-center justify-center ml-0.8 w-[30px]' 
          ><FaAngleDown className={`transition-all ${submenuIndex===1 ?'rotate-180':''}`}/></span>
          </div>
          </Button>


        <Collapse isOpened={submenuIndex===1?true:false}>
          <ul className='w-full'>
            <li className='w-full'>
              <Button className='!text-[rgba(0,0,0,0.8)] !pl-10 !capatalize w-full !text-[12px] 
              !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full !bg-black'></span>
                Home Banner  List
              </Button>
            </li>

            <li className='w-full'>
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full  !bg-black '></span>
                Add Home Slide
              </Button>
            </li>
          </ul>
        </Collapse>

          </li>

          <li>
          <Button className='!justify-start !capatalize !py-2 gap-3 !text-black !font-[500]' >
          <div className="flex items-center gap-3">< ImUsers className='!text-[18px]'/>
          Users
          </div></Button>
          </li>

          <li>
          <Button className='!flex items-center justify-start !py-2 !capatalize gap-3
           !text-black !font-[500]' onClick={()=>isOpensubmenu(2)} >
          <div className="flex items-center gap-3">
          <FaProductHunt  className='!text-[18px]'/>
         <span>Products</span> 
          <span className='flex items-center justify-center !ml-5 w-[30px]' 
          ><FaAngleDown className={`transition-all ${submenuIndex===2 ?'rotate-180':''}`}/></span>
          </div>
          </Button>


        <Collapse isOpened={submenuIndex===2?true:false}>
          <ul className='w-full'>
            <li className='w-full'>
              <Button className='!text-[rgba(0,0,0,0.8)] !pl-10 !capatalize w-full !text-[12px] 
              !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full !bg-black'></span>
                Products List
              </Button>
            </li>

            <li className='w-full'>
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full  !bg-black '></span>
                Product Upload
              </Button>
            </li>
          </ul>
        </Collapse>

          </li>

          <li>
          <Button className='!flex items-center justify-start !py-2 !capatalize gap-3
           !text-black !font-[500]' onClick={()=>isOpensubmenu(3)} >
          <div className="flex items-center gap-3">
          < BiSolidCategory  className='!text-[18px]'/>
         <span>Category</span> 
          <span className='flex items-center justify-center !ml-5 w-[30px]' 
          ><FaAngleDown className={`transition-all ${submenuIndex===3 ?'rotate-180':''}`}/></span>
          </div>
          </Button>


        <Collapse isOpened={submenuIndex===3?true:false}>
          <ul className='w-full'>
            <li className='w-full'>
              <Button className='!text-[rgba(0,0,0,0.8)] !pl-10 !capatalize w-full !text-[12px] 
              !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full !bg-black'></span>
                Category List
              </Button>
            </li>

            <li className='w-full'>
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full  !bg-black '></span>
                Add Category List
              </Button>
            </li>

            <li className='w-full'>
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full  !bg-black '></span>
                Sub Category List
              </Button>
            </li>

            <li className='w-full'>
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full  !bg-black '></span>
                Add  Sub Cat List
              </Button>
            </li>
          </ul>
        </Collapse>

          </li>
          <li>
          <Button className='!justify-start !py-2 !capatalize gap-3 !text-black !font-[500]' >
          <div className="flex items-center gap-3">< IoBagCheck className='!text-[18px]'/>
         <span>Orders</span> </div>
         </Button>
          </li>

          <li>
          <Button className='!justify-start  !py-2 !capatalize gap-3 !text-black !font-[500]' >
          <div className="flex items-center gap-3">
         <IoLogOut className='!text-[18px]'/>
          <span>Logout</span></div></Button>
          </li>
      </ul>
      </div>
  )
}

export default Sidebar