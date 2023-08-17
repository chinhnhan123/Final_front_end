import React from "react";
import { useNavigate } from "react-router";
import Modals from "../../components/modal/CreateModal";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
export default function PigCard({ idPig }) {
  const navigate = useNavigate();

  return (
    <div className="w-full sm:w-[90%] bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between ">
        <div className="mb-2">
          <p className="text-lg font-semibold">Pig name</p>
          <p className="text-xs font-extralight">Quantity: 20</p>
        </div>
        <div>
          <Modals
            icon={
              <DeleteOutlined className="mr-5 text-2xl cursor-pointer hover:opacity-40" />
            }
          />

          <EditOutlined
            className="text-2xl cursor-pointer hover:opacity-40"
            onClick={() => {
              navigate(`/updatePig/${idPig}`, {
                state: { name: "hei", category: "123", quantity: 12 },
              });
            }}
          />
        </div>
      </div>
      <img
        src="https://www.thesprucepets.com/thmb/Yf7tDTP_ZyZiA_Hux7FJWe1kZSY=/3888x0/filters:no_upscale():strip_icc()/close-up-of-pig-702612173-5c8ba81146e0fb00016ee068.jpg"
        alt=""
        className="w-full h-[200px] object-cover rounded-lg "
        onClick={() => {
          navigate(`/detailPig/${idPig}`);
        }}
      />
    </div>
  );
}
