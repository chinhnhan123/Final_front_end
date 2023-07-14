import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Main = () => {
  return (
    <div className="w-full h-screen overflow-y-clip">
      <div className="flex h-full">
        <SideBar></SideBar>
        <div className="w-full">
          <div className="w-full h-12 bg-[#FFFAEB]"></div>
          <div className="bg-[#FEEFC7] w-full h-full p-3 md:px-14 md:py-7 overflow-scroll ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
