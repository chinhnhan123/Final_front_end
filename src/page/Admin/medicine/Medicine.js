import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Modals from "../../../components/modal/CreateModal";
import Button from "../../../components/core/Button";
import Table from "../../../components/table/Table";
import {
  getMedicine as getMedicineApi,
  deleteMedicine,
} from "../../../services/api/medicine";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const Medicine = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getMedicine = async () => {
      const res = await getMedicineApi();
      setData([...res.data]);
    };
    getMedicine();
  }, []);

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteMedicine(id);
      // Refresh data after successful deletion
      const res = await getMedicineApi();
      setData([...res.data]);
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const styleNameColumn = "text-lg font-bold";
  const columns = [
    {
      title: "",
      dataIndex: "urlImage",
      render: (url) => (
        <>
          <img src={url} alt="image" className="w-28" />
        </>
      ),
      width: "13%",
    },
    {
      title: "Medicine",
      dataIndex: "nameMedicine",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="text-lg font-normal ">{text}</span>
        </>
      ),
      width: "15%",
    },
    {
      title: "Types",
      dataIndex: "types",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="text-lg font-normal ">{text}</span>
        </>
      ),
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="text-lg font-normal ">{text}</span>
        </>
      ),
    },
    {
      title: "Instruction",
      dataIndex: "instruction",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="text-lg font-normal ">{text}</span>
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      className: styleNameColumn,
      render: (_id) => (
        <div className="flex">
          <a href={`/update-medicine/${_id}`} className="mr-4 2xl:mr-8">
            <EditOutlined
              className="rounded-full bg-[#E7F8E3] p-1"
              style={{ fontSize: "20px", color: "#86F298" }}
            />
          </a>
          <Modals
            icon={
              <DeleteOutlined
                className="rounded-full bg-[#FCEBEA] p-1 cursor-pointer"
                style={{ fontSize: "20px", color: "#D34053" }}
              />
            }
            handleDeleteConfirm={handleDeleteConfirm}
            okText="Delete"
            title="Delete Medicine"
            content="Are you sure you want to delete this medicine?"
            id={_id}
          />
        </div>
      ),
      width: "12%",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10">
        <Button
          type="link"
          icon={<PlusOutlined className="-translate-y-[3px] pr-[2px]" />}
          onClick={() => {
            navigate("/create-medicine");
          }}
        >
          Create new medicine
        </Button>{" "}
      </div>
      <div className="w-[95%] 2xl:w-[88%] mt-10 flex justify-center items-center">
        <Table
          dataSource={data}
          columns={columns}
          className="w-full mb-20 drop-shadow-lg"
          showSizeChanger={false}
          pageSizeOptions={["10", "20", "30"]}
        ></Table>
      </div>
    </div>
  );
};

export default Medicine;
