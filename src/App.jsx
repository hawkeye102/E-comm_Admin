import React from "react";
import "./App.css";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

const App = ()=>{
  const router = createBrowserRouter([{
    path:"/",
    exact:true,
    element:(

      <section className="main">
         <Header/>
        
       
        <div className="contentMain flex">
          <div className="sidebarWrapper w-[18%]">
          <Sidebar/>
          </div>
           <div className="contentRight !py-3 !px-3 mt-2 w-[80%]">
          <Dashboard/>
        </div>
        
        </div>
       
        
      
       
        
      </section>
   

    ),
  }])
  return(
    <>
   <RouterProvider router={router}/>
   
   </>
  )

}

export default App