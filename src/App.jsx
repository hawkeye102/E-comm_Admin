import React, { useState, createContext } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login"
import Signup from "./Pages/SignUp";
import Product from "./Pages/Products";
import { Outlet } from "react-router-dom";

import AddProducts from "./Pages/Products/AddProduct";
import HomeSlider from "./Pages/Homebanner";
import AddHomeSlide from "./Pages/Homebanner/AddHomeSlide";

import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import Profile from "./Pages/Profile";

const Mycontext = createContext();


import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoClose } from "react-icons/io5";
import { Button } from '@mui/material'
import CategoryList from "./Pages/Category/addcategory";
import AddCategory1 from "./Pages/Category/add1";
import SubCategoryList from "./Pages/Category/addSubcategory copy";
import AddSubCategory1 from "./Pages/Category/addSub1";
import Users from "./Pages/Users";
import Order from "./Pages/Orders/order";
import ForgetPassword from "./Pages/ForgotPassword";

import VerifyUI from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";
import AddAddress from "./Pages/Address";
import EditCategory from "./Pages/Category/Editcategory";
import {fetchDataFromApi } from "../Utils/api";
import EditProducts from "./Pages/Products/EditProduct";

const Layout = () => {
  const { issidebaropen } = React.useContext(Mycontext);
  
 

  return (
    <section className="main w-full h-screen flex flex-col">
      <Header />

      <div className="contentMain flex w-full">
        {/* Sidebar */}
        <div
          className={`sidebarWrapper overflow-hidden transition-all duration-300 ease-in-out ${
            issidebaropen ? "w-[18%]" : "w-0"
          }`}
        >
           {issidebaropen && (
            <div className="h-full min-h-screen">
              <Sidebar />
            </div>
          )}
        </div>

        {/* page content */}
        <div
          className={`contentRight h-full overflow-auto transition-all py-3 px-3 mt-2 flex-grow ${
            issidebaropen ? "w-[82%]" : "w-full"
          }`}
        >
          <Outlet/>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [issidebaropen, setIssidebaropen] = useState(true);
  const [isLogin,setisLogin] = useState(false)
  const [isScreenPanelopen,setisScreenPanelopen] =useState({
    open:false,
    id:''
  })
  
  const openAlertBox=(status,msg)=>{
    if(status==="success"){
      toast.success(msg);
    }
    if(status==="error"){
      toast.error(msg);
    }
   

  }

  const router = createBrowserRouter([
    {
    path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> }, // homepage default
        { path: "product", element: <Product /> },
        { path: "Homeslider/list", element: <HomeSlider/> },
        { path: "Category/list", element: <CategoryList/> },
        { path: "SubCategory/list", element: <SubCategoryList/> },
        { path: "users", element: <Users/> }, 
        { path: "orders", element: <Order/> }, 
        { path: "/profile", element: <Profile/> },
       
      ],
    },
    { path: "/sign-up", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/forget-password", element: <ForgetPassword/> },
    { path: "/verify-account", element: <VerifyUI/> },
    { path: "/change-password", element: <ChangePassword/> },
   
  ]);

  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    if(token!==undefined && token!== null && token !==""){
      setisLogin(true)
    }else{
      setisLogin(false)
    }
    
    
    },[isLogin])
    
  const values={
    issidebaropen,
     setIssidebaropen,
    isLogin,
    setisLogin,
    isScreenPanelopen,
    setisScreenPanelopen,
    openAlertBox,
    
    

  }
  return (
    <Mycontext.Provider value={values}>
      <RouterProvider router={router} />

      <Dialog
        fullScreen
        open={isScreenPanelopen.open}
        keepMounted
        onClose={()=>setisScreenPanelopen((prev) => ({
          ...prev,
          open: false
        }))}
        >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                setisScreenPanelopen({
                  open: false,
                  
                })
              }
              
              aria-label="close"
            >
              < IoClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {isScreenPanelopen?.model}
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>setisScreenPanelopen({
          open:false
        })}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {
          isScreenPanelopen?.model ==='Add Product' && <AddProducts/>
        }

        {
          isScreenPanelopen?.model ==='Add Home Slide' && <AddHomeSlide/>
        }

        {
          isScreenPanelopen?.model ==='Add New Category' && <AddCategory1/>
        }

        {
          isScreenPanelopen?.model ==='Add New Sub Category' && <AddSubCategory1/>
        }
        {
          isScreenPanelopen?.model ==='Add Address' && <AddAddress/>
        }

        {
          isScreenPanelopen?.model ==='Edit Category' && <EditCategory/>
        }

{
          isScreenPanelopen?.model ==='Edit Product' && <EditProducts/>
        }


      </Dialog>
      <Toaster />
    </Mycontext.Provider>
  );
};

export default App;
export { Mycontext };
export {Layout};
