import React from "react";
import { MessageOutlined } from "@ant-design/icons";

export default function TraderCard() {
  return (
    <div className="w-full sm:w-[90%] min-w-[300px] bg-white p-4 rounded-lg shadow-lg">
      <div className="flex">
        <div>
          <img
            src="https://thuthuatnhanh.com/wp-content/uploads/2022/08/hinh-anh-avatar-luffy-mac-do-kimono.jpg"
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="mb-3 ml-2 ">
          <h1 className="text-2xl font-semibold">Phan le Chinh Nhan</h1>
          <p className="flex text-base font-extralight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 mt-1 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            Đà Nẳng
          </p>
        </div>
      </div>
      <img
        src="https://thuthuatnhanh.com/wp-content/uploads/2022/08/hinh-anh-avatar-luffy-mac-do-kimono.jpg"
        alt=""
        className="w-full h-[200px] object-cover rounded-lg "
      />
      <div>
        <div className="flex justify-between mt-2">
          <div className="flex gap-2 text-xl font-normal">
            <p>pig name</p>
            <p>Quantity: 20</p>
          </div>
          <MessageOutlined
            style={{ fontSize: "26px" }}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
