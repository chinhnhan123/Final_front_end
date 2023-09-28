import React from "react";
import { useNavigate } from "react-router";
import Modals from "../../components/modal/CreateModal";
import defaultImage from "../../assets/images/pig2.jpg";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
export default function PigCard({
  idPig,
  handleDeleteConfirm,
  name,
  quantity,
  image,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full sm:w-[90%] bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between ">
        <div className="mb-2">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-xs font-extralight">Số lượng: {quantity}</p>
        </div>
        <div>
          <Modals
            id={idPig}
            icon={
              <DeleteOutlined className="mr-5 text-2xl cursor-pointer hover:opacity-40" />
            }
            title="Xóa đàn heo"
            content="Bạn có chắc chắn muốn xóa đàn heo này?"
            handleDeleteConfirm={handleDeleteConfirm}
          />

          <EditOutlined
            className="text-2xl cursor-pointer hover:opacity-40"
            onClick={() => {
              navigate(`/update-pig/${idPig}`);
            }}
          />
        </div>
      </div>
      <img
        src={image || defaultImage}
        alt=""
        className="w-full h-[200px] object-cover rounded-lg "
        onClick={() => {
          navigate(`/detail-pig/${idPig}`);
        }}
      />
    </div>
  );
}
