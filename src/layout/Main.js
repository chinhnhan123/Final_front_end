import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Main = () => {
  return (
    <div className="w-full h-screen overflow-clip">
      <div className="flex h-full">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
