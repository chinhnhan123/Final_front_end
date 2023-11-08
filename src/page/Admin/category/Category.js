import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Button from "../../../components/core/Button";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import Modals from "../../../components/modal/CreateModal";

import Table from "../../../components/table/Table";
import {
  getCategory as getCategoryAPI,
  deleteCategory,
} from "../../../services/api/category";
const Category = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const res = await getCategoryAPI();
      setData([...res.data]);
    };
    getCategory();
  }, []);

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteCategory(id);
      // Refresh data after successful deletion
      const res = await getCategoryAPI();
      setData([...res.data]);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const styleNameColumn = "text-lg font-bold";
  const columns = [
    {
      title: "Category",
      dataIndex: "nameCategory",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="text-lg font-normal ">{text}</span>
        </>
      ),
      width: "10%",
    },
    {
      title: "kilogram",
      dataIndex: "kilogram",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="text-lg font-normal ">{text}</span>
        </>
      ),
      width: "10%",
    },
    {
      title: "Raising Days",
      dataIndex: "daysToRaisePigs",
      className: styleNameColumn,
      render: (text) => (
        <>
          <span className="text-lg font-normal ">{text}</span>
        </>
      ),
      width: "12%",
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
          <a href={`/update-category/${_id}`} className="mr-4">
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
            okText="Ok"
            title="Delete Category"
            content="Are you sure you want to delete this category?"
            id={_id}
          />
        </div>
      ),
      width: "10%",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10">
        <Button
          type="link"
          icon={<PlusOutlined className="-translate-y-[3px] pr-[2px]" />}
          onClick={() => {
            navigate("/create-category");
          }}
        >
          Create new Category
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

export default Category;
