import React from "react";
import { useContext } from "react";

import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { AuthContext } from "../context/auth/AuthContext";
const Main = () => {
  const { user } = useContext(AuthContext);
  if (user === null) {
    window.location.href = "/login";
  }

  return (
    <div className="w-full h-screen overflow-y-clip">
      <div className="flex h-full">
        <SideBar></SideBar>
        <div className="w-full">
          <div className="w-full h-12 bg-[#FFFAEB]"></div>
          <div className="bg-[#FEEFC7] w-full h-full  overflow-scroll ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
