import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Button from "../../../components/core/Button";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import axios from "../../../http/index";

import Table from "../../../components/table/Table";
const Medicine = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getFood = async () => {
      const res = await axios.get("http://localhost:4000/api/medicine");
      setData([...res.data]);
    };
    getFood();
  }, []);

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
      width: "15%",
    },
    {
      title: "Medicine",
      dataIndex: "nameMedicine",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="ml-3 text-lg font-normal">{text}</span>
        </>
      ),
      width: "18%",
    },
    {
      title: "Types",
      dataIndex: "types",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="ml-3 text-lg font-normal">{text}</span>
        </>
      ),
      width: "18%",
    },
    {
      title: "Description",
      dataIndex: "description",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="ml-3 text-lg font-normal">{text}</span>
        </>
      ),
    },
    {
      title: "Instruction",
      dataIndex: "instruction",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="ml-3 text-lg font-normal">{text}</span>
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      className: styleNameColumn,
      render: (_id) => (
        <div className="flex">
          <a href={`/updateMedicine/${_id}`} className="mr-4 2xl:mr-8">
            <EditOutlined
              className="rounded-full bg-[#E7F8E3] p-1"
              style={{ fontSize: "20px", color: "#86F298" }}
            />
          </a>
          <a href={`/deleteMedicine/${_id}`}>
            <DeleteOutlined
              className="rounded-full bg-[#FCEBEA] p-1"
              style={{ fontSize: "20px", color: "#D34053" }}
            />
          </a>
        </div>
      ),
      width: "15%",
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
      <div className="w-[70%] mt-10 flex justify-center items-center">
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
