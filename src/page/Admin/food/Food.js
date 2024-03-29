import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import Button from "../../../components/core/Button";
import Table from "../../../components/table/Table";
import Modals from "../../../components/modal/CreateModal";

import { PlusOutlined } from "@ant-design/icons";

import { getFood as getFoodAPI, deleteFood } from "../../../services/api/food";

const Food = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getFood = async () => {
      const res = await getFoodAPI();
      setData([...res.data]);
    };
    getFood();
  }, []);

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteFood(id);
      // Refresh data after successful deletion
      const res = await getFoodAPI();
      setData([...res.data]);
    } catch (error) {
      console.error("Error deleting food:", error);
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
      width: "15%",
    },
    {
      title: "Food",
      dataIndex: "nameFood",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="text-lg font-normal ">{text}</span>
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
          <a href={`/update-food/${_id}`} className="mr-4 2xl:mr-8">
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
            title="Delete Food"
            content="Are you sure you want to delete this food?"
            id={_id}
          />
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
            navigate("/create-food");
          }}
        >
          Create new food
        </Button>{" "}
      </div>
      <div className="w-[95%] 2xl:w-[80%] mt-10 flex justify-center items-center">
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

export default Food;
