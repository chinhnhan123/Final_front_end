import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/core/Button";
import { PlusSquareOutlined } from "@ant-design/icons";
import PigCard from "../../components/cards/PigCard";
import { useNavigate } from "react-router";
import axios from "../../http/index";
import { AuthContext } from "../../context/auth/AuthContext";

export default function Pigs() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: Pigs.js:12 ~ data:", data);
  useEffect(() => {
    const getHerd = async () => {
      const res = await axios.get(`http://localhost:4000/api/herd/${user.id}`);
      setData([...res.data]);
    };
    getHerd();
  }, []);

  const handleDeleteConfirm = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/herd/${id}`);
      // Refresh data after successful deletion
      const res = await axios.get("http://localhost:4000/api/herd");
      setData([...res.data]);
    } catch (error) {
      console.error("Error deleting herd:", error);
    }
  };

  return (
    <div className="p-3 md:px-14 md:py-7">
      <div className="mb-10 text-center">
        <Button
          type="link"
          icon={<PlusSquareOutlined className="-translate-y-[3px] pr-[2px]" />}
          onClick={() => {
            navigate("/create-pig");
          }}
        >
          Create new pig
        </Button>
      </div>
      <div className="grid grid-cols-1 mb-8 sm:gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((item) => (
          <PigCard
            key={item._id}
            idPig={item._id}
            name={item.name}
            quantity={item.quantity}
            image={item.urlImage}
            handleDeleteConfirm={handleDeleteConfirm}
          />
        ))}
      </div>
    </div>
  );
}
