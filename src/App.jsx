import React, { useState, createContext } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login"
import Signup from "./Pages/SignUp";

const Mycontext = createContext();


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
          {issidebaropen && <Sidebar />}
        </div>

        {/* Dashboard content */}
        <div
          className={`contentRight transition-all py-3 px-3 mt-2 flex-grow ${
            issidebaropen ? "w-[82%]" : "w-full"
          }`}
        >
          <Dashboard />
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [issidebaropen, setIssidebaropen] = useState(true);
  const [isLogin,setisLogin] = useState()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
    },

    {
      path: "/login",
      element: <Login/>,
    },

    {
      path: "/sign-up",
      element: <Signup/>,
    },
  ]);

  const values={
    issidebaropen,
     setIssidebaropen,
    isLogin,
    setisLogin
  }
  return (
    <Mycontext.Provider value={values}>
      <RouterProvider router={router} />
    </Mycontext.Provider>
  );
};

export default App;
export { Mycontext };
