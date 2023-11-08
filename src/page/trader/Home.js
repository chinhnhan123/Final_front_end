import React, { useEffect, useState, useRef } from "react";
import TraderCard from "../../components/cards/TraderCard";
import axios from "../../http/index";
import { Pagination } from "antd";

export default function Home() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const inputMessage = useRef();

  useEffect(() => {
    const getHerd = async () => {
      const res = await axios.get(`http://localhost:4000/api/herd`);
      console.log("🚀 ~ file: Home.js:19 ~ getHerd ~ res:", res);
      setData([...res.data.data]);
      setTotal(res.data.totalDocs);
    };
    getHerd();
  }, []);

  const onChange = async (page) => {
    const res = await axios.get(`http://localhost:4000/api/herd?page=${page}`);
    setData([...res.data.data]);
    setTotal(res.data.totalDocs);
    setCurrent(page);
  };

  const handleSearch = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/herd?searchTerm=${inputMessage.current.value}`
    );
    setData([...res.data.data]);
    setTotal(res.data.totalDocs);
  };

  return (
    <div className="p-3 md:px-8 md:py-4">
      <div className="flex justify-center mb-16">
        <div className="flex items-center mt-10">
          <div className="flex space-x-1 w-[400px] 2xl:w-[500px]">
            <input
              type="text"
              className="block w-full px-4 py-2 text-black bg-white border rounded-full xl:px-6 xl:py-3 focus:border-[#FDB022] focus:ring-[#FDB022] focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              ref={inputMessage}
            />
            <button
              onClick={handleSearch}
              className="px-4 text-white bg-[#FDB022] rounded-full xl:px-6 cursor-pointer "
            >
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
      <div className="grid grid-cols-1 mb-8 sm:gap-x-4 gap-y-8 md:grid-cols-2 2xl:grid-cols-3">
        {data?.map((item) => (
          <TraderCard
            key={item._id}
            idAccount={item.accountInfo[0]._id}
            name={item.accountInfo[0].fullName}
            namePig={item.name}
            quantity={item.quantity}
            image={item.urlImage}
            category={item.categoryInfo[0].nameCategory}
          />
        ))}
      </div>
      <Pagination current={current} onChange={onChange} total={total} />
    </div>
  );
}
