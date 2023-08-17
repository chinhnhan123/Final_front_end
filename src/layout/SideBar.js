import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LeftCircleOutlined,
  MessageOutlined,
  ProfileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import HamburgerButton from "../components/HamburgerMenuButton/HamburgerButton";
import { AuthContext } from "../context/auth/AuthContext";
import { useContext } from "react";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  let Menus = [];
  // if (user?.role === "Farmer") {
  //   Menus = [
  //     { title: "Home", path: "/", src: <HomeOutlined /> },
  //     { title: "Chat box", path: "/message", src: <MessageOutlined /> },
  //     { title: "DashBoard", path: "/dashboard", src: <ProfileOutlined /> },
  //     { title: "Log out", path: "/logout", src: null, gap: "true" },
  //   ];
  // }
  // if (user?.role === "Admin") {
    Menus = [
      { title: "Guide", path: "/guide", src: <HomeOutlined /> },
      { title: "Category", path: "/category", src: <HomeOutlined /> },
      { title: "Food", path: "/food", src: <HomeOutlined /> },
      { title: "Medicine", path: "/medicine", src: <HomeOutlined /> },
      { title: "Log out", path: "/logout", src: null, gap: "true" },
    ];
  // }
  // if (user?.role === "Trader") {
  //   Menus = [
  //     { title: "Home", path: "/trader", src: <ProfileOutlined /> },
  //     { title: "Log out", path: "/logout", src: null, gap: "true" },
  //   ];
  // }
  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-fit"
        } hidden sm:block relative h-screen duration-300 bg-[#FFFAEB] border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
      >
        <LeftCircleOutlined
          style={{ fontSize: "32px" }}
          className={`${
            !open && "rotate-180"
          } absolute fill-slate-800 text-stone-500 bg-white cursor-pointer top-9 -right-4 rounded-full`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/">
          <div className={`flex ${open && "gap-x-4"} items-center`}>
            <img
              src="https://thuthuatnhanh.com/wp-content/uploads/2022/08/hinh-anh-avatar-luffy-mac-do-kimono.jpg"
              alt=""
              className="rounded-full w-14 h-14"
            />
            {open && (
              <span className="text-lg font-extralight whitespace-nowrap dark:text-white">
                Luffy
              </span>
            )}
          </div>
        </Link>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer  hover:bg-[#FDB022] hover:text-white transform
                        ${menu.gap ? "mt-9" : "mt-2"} ${
                  location.pathname === menu.path && "bg-[#FDB022] text-white"
                }`}
              >
                <span className="pb-3 text-2xl">{menu?.src}</span>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
