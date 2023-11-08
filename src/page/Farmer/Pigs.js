import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Button from "../../components/core/Button";
import PigCard from "../../components/cards/PigCard";
import { AuthContext } from "../../context/auth/AuthContext";
import { getHerdByAccount, deleteHerd, getHerd } from "../../services/api/herd";
import { PlusSquareOutlined } from "@ant-design/icons";

export default function Pigs() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getHerd = async () => {
      const res = await getHerdByAccount(user.id);
      setData([...res.data]);
    };
    getHerd();
  }, []);

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteHerd(id);
      // Refresh data after successful deletion
      const res = getHerd();
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
