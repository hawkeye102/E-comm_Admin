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

      <section>
        <div className="main">
        <Header/>
        <div className="contentMain flex">
          <div className="sidebarWrapper w-[25%]"></div>
        </div>
        </div>
        <Sidebar/>
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