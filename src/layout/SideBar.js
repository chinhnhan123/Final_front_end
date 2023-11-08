import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LeftCircleOutlined,
  MessageOutlined,
  ProfileOutlined,
  HomeOutlined,
  WindowsOutlined,
  HeartOutlined,
  AppleOutlined,
  UserOutlined,
  LoginOutlined,
  AreaChartOutlined,
  AndroidOutlined,
} from "@ant-design/icons";
import HamburgerButton from "../components/HamburgerMenuButton/HamburgerButton";
import { AuthContext } from "../context/auth/AuthContext";
import { useContext } from "react";
import logo from "../assets/images/logo.jpg";
import rocket from "../assets/images/startup.png";
import Payment from "../components/paymentStripe/Payment";
import StripeCheckout from "react-stripe-checkout";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const stripeKey =
    "sk_test_51Ny3rpFX2CDVz062Nqo3OfXOdc2Go5tMuAp7MrLAh3C8NN7v4qV1vI0ir9OG6Dsgfa7IrVxFx6frK06YSaSLZFGE00I51hHabP";
  const handleToken = async (token, adresses) => {
    console.log(
      "🚀 ~ file: Payment.js:6 ~ handleToken ~ token:",
      token,
      adresses
    );
  };
  const handleLogout = () => {
    console.log("🚀 ~ file: SideBar.js:29 ~ handleLogout ~ handleLogout:");
    localStorage.clear();
  };
  let Menus = [];
  if (user?.role === "Farmer") {
    Menus = [
      { title: "Home", path: "/", src: <HomeOutlined /> },
      { title: "Chat box", path: "/message", src: <MessageOutlined /> },
      { title: "Profile", path: "/profile", src: <ProfileOutlined /> },
      { title: "Chat With AI", path: "/chat-bot", src: <AndroidOutlined /> },
      {
        title: "Log out",
        path: "/login",
        src: <LoginOutlined />,
        gap: "true",
        handleLogout: "true",
      },
    ];
  }
  if (user?.role === "Admin") {
    Menus = [
      { title: "Dashboard", path: "/dashboard", src: <AreaChartOutlined /> },
      { title: "Guide", path: "/guide", src: <HomeOutlined /> },
      { title: "Category", path: "/category", src: <WindowsOutlined /> },
      { title: "Food", path: "/food", src: <AppleOutlined /> },
      { title: "Medicine", path: "/medicine", src: <HeartOutlined /> },
      { title: "Accounts", path: "/accounts", src: <UserOutlined /> },
      {
        title: "Log out",
        path: "/login",
        src: <LoginOutlined />,
        gap: "true",
        handleLogout: "true",
      },
    ];
  }
  if (user?.role === "Trader") {
    Menus = [
      { title: "Home", path: "/trader", src: <ProfileOutlined /> },
      { title: "Chat box", path: "/message", src: <MessageOutlined /> },
      {
        title: "Log out",
        path: "/login",
        src: <LoginOutlined />,
        gap: "true",
        handleLogout: "true",
      },
    ];
  }
  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-[100px]"
        } hidden sm:block relative h-screen duration-300 bg-[#FFFAEB] border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
      >
        <LeftCircleOutlined
          style={{ fontSize: "32px" }}
          className={`${
            !open && "rotate-180"
          } absolute fill-slate-800 text-stone-500 bg-white cursor-pointer top-1 -right-4 rounded-full`}
          onClick={() => setOpen(!open)}
        />
        <div className={`flex ${open && "gap-x-2"} items-center`}>
          <img
            src={logo}
            alt=""
            className={`rounded-full w-14 h-14 ${open ? "!w-20 !h-20" : ""}`}
          />
          {open && (
            <span className="text-2xl font-bold select-none text-stone-500">
              PigCare
            </span>
          )}
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-2 text-base font-normal rounded-lg cursor-pointer  hover:bg-[#FDB022] hover:text-white transform
                        ${menu.gap ? "mt-9" : "mt-2"} ${
                  location.pathname === menu.path && "bg-[#FDB022] text-white"
                }`}
                onClick={() => menu?.handleLogout && handleLogout()}
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

        {open
          ? user?.role == "Farmer" && (
              <div className="absolute bottom-0 left-0 right-0 px-2 py-5 m-3 flex bg-cyan-100 rounded-lg ">
                <div className="w-[60%]">
                  <p className="mb-3 text-lg font-normal line leading-5">
                    {" "}
                    Upgrade to Pro
                  </p>
                  <span className="px-3 py-2 bg-sky-700 hover:opacity-50 cursor-pointer rounded-lg text-white ">
                    <StripeCheckout
                      stripeKey={stripeKey}
                      description="Please fill in the details below"
                      image={logo}
                      billingAddress
                      amount={15 * 100}
                      currency="USD"
                      name="Update to Pro Version"
                    >
                      Buy Pro
                    </StripeCheckout>
                  </span>
                </div>
                <div className="w-[40%]">
                  <img className="w-24" src={rocket} alt="rocket" />
                </div>
              </div>
            )
          : user?.role == "Farmer" && (
              <div className="absolute bottom-0 left-0 right-0 px-2 py-5 mt-5 ml-3 ">
                <img className="w-12" src={rocket} alt="rocket" />
              </div>
            )}
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
                onClick={() => menu?.handleLogout && handleLogout()}
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
