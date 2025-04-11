import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
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
import { Mycontext } from '../../App';


const Sidebar = () => {
  const [submenuIndex,setSubmenuIndex]=useState()
   const isOpensubmenu=(index)=>{
    if(submenuIndex===index){
      setSubmenuIndex(null)
    }else{
      setSubmenuIndex(index)
    }
    
   }
   const context =useContext(Mycontext)
  return (
    <div className="sidebar    bg-[#fff]  h-full border-r  overflow-hidden
      transition-all duration-300 ease-in-out
    border-[rgba(0,0,0,0.1)]  w-full">
      <div className=' w-full'>
        <Link to="/"><img src='/shop.jpg' className='w-[120px] object-cover rounded-md'/></Link>
      </div>

      <ul>
        <li>
          <Link to='/'>
          <Button className='!justify-start !capatalize gap-3 !text-black !font-[500] !py-2' >
          <div className="flex items-center gap-3">
          <span><RxDashboard className='!text-[18px]'/></span>
         <span>Dashboard</span> 
          </div>
          </Button>
          </Link>
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
          <Link to='/users'>
          <Button className='!justify-start !capatalize !py-2 gap-3 !text-black !font-[500]' >
          <div className="flex items-center gap-3">< ImUsers className='!text-[18px]'/>
          Users
          </div></Button>
          </Link>
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
            <Link to='/product'>
              <Button className='!text-[rgba(0,0,0,0.8)] !pl-10 !capatalize w-full !text-[12px] 
              !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full !bg-black'></span>
                Products List
              </Button>
              </Link>
            </li>

            <li className='w-full'>
           
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1' onClick={() =>
                context.setisScreenPanelopen({
                  open: true,
                  model:'Add Product'
                })
              }>
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
            <Link to='/categories'>
              <Button className='!text-[rgba(0,0,0,0.8)] !pl-10 !capatalize w-full !text-[12px] 
              !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full !bg-black'></span>
                Category List
              </Button>
              </Link>
            </li>

            <li className='w-full'>
            <Link to='/category/add'>
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full  !bg-black '></span>
                Add Category List
              </Button>
              </Link>
            </li>

            <li className='w-full'>
            <Link to='/category/subcat'>
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full  !bg-black '></span>
                Sub Category List
              </Button>
              </Link>
            </li>

            <li className='w-full'>
            <Link to='/category/subcat/add'>
              <Button className='!text-[rgba(0,0,0,0.8)] !capatalize w-full !text-[12px] 
              !pl-10 !font-[400] !justify-start !gap-1'>
                <span className='!block !w-[5px] !h-[5px] !rounded-full  !bg-black '></span>
                Add  Sub Cat List
              </Button>
              </Link>
            </li>
          </ul>
        </Collapse>

          </li>
          <li>
          <Link to='/orders'>
          <Button className='!justify-start !py-2 !capatalize gap-3 !text-black !font-[500]' >
          <div className="flex items-center gap-3">< IoBagCheck className='!text-[18px]'/>
         <span>Orders</span> </div>
         </Button>
         </Link>
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