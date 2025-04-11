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

const Mycontext = createContext();


import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoClose } from "react-icons/io5";
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material'


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
  const [isLogin,setisLogin] = useState()
  const [isScreenPanelopen,setisScreenPanelopen] =useState({
    open:false,
    model:''
  })

  const router = createBrowserRouter([
    {
    path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> }, // homepage default
        { path: "product", element: <Product /> }, // /product page
        // Add more like { path: "orders", element: <Orders /> } etc.
      ],
    },
    { path: "/sign-up", element: <Signup /> },
    { path: "/login", element: <Login /> },
  ]);

  const values={
    issidebaropen,
     setIssidebaropen,
    isLogin,
    setisLogin,
    isScreenPanelopen,
    setisScreenPanelopen

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
      </Dialog>
    </Mycontext.Provider>
  );
};

export default App;
export { Mycontext };
export {Layout};
