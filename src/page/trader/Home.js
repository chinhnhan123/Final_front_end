import React, { useEffect, useState } from "react";
import TraderCard from "../../components/cards/TraderCard";
import { useNavigate } from "react-router";
import axios from "../../http/index";

export default function Home() {
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: Home.js:8 ~ data:", data);
  const navigate = useNavigate();

  useEffect(() => {
    const getHerd = async () => {
      const res = await axios.get(`http://localhost:4000/api/herd/`);
      setData([...res.data]);
    };
    getHerd();
  }, []);

  return (
    <div className="p-3 md:px-14 md:py-7">
      <div className="flex justify-center mb-16">
        <div className="flex items-center mt-10">
          <div className="flex space-x-1 w-[400px] 2xl:w-[500px]">
            <input
              type="text"
              className="block w-full px-4 py-2 text-black bg-white border rounded-full xl:px-6 xl:py-3 focus:border-[#FDB022] focus:ring-[#FDB022] focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
            />
            <button className="px-4 text-white bg-[#FDB022] rounded-full xl:px-6 cursor-pointer ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mb-8 sm:gap-x-2 gap-y-8 md:grid-cols-2 2xl:grid-cols-3">
        {data?.map((item) => (
          <TraderCard
            key={item._id}
            idAccount={item.idAccount._id}
            name={item.idAccount.fullName}
            namePig={item.name}
            quantity={item.quantity}
            image={item.urlImage}
          />
        ))}
      </div>
    </div>
  );
}
