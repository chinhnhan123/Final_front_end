import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Tabs, Collapse } from "antd";

import Modals from "../../../components/modal/SelectCategoriesModal";
import { PlusOutlined } from "@ant-design/icons";
import {
  getCategoryInGuide as getCategoryInGuideAPI,
  getCategoryNotInGuide as getCategoryNotInGuideAPI,
} from "../../../services/api/category";
import { getGuideById } from "../../../services/api/guide";

const { TabPane } = Tabs;

const Guide = () => {
  const navigate = useNavigate();
  const [categoryInGuide, setCategoryInGuide] = useState([]);
  const [categoriesNotInGuide, setCategoriesNotInGuide] = useState([]);
  const [guide, setGuide] = useState([]);
  const [idCategory, setIdCategory] = useState("");

  const getCategoryInGuide = async () => {
    try {
      const res = await getCategoryInGuideAPI();
      if (res.status === 200) {
        setCategoryInGuide(res?.data);
        getGuides(res?.data[0]?._id);
        setIdCategory(res?.data[0]?._id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCategoriesNotInGuide = async () => {
    try {
      const res = await getCategoryNotInGuideAPI();
      if (res.status === 200) {
        setCategoriesNotInGuide(res?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCategoryInGuide();
    getCategoriesNotInGuide();
  }, []);

  const getGuides = async (categoryId) => {
    try {
      const guidesRes = await getGuideById(categoryId);
      setGuide(
        guidesRes?.data.sort((a, b) => a.idStage.idStage - b.idStage.idStage)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onChange = (categoryId) => {
    console.log("🚀 ~ file: Guide.js:44 ~ categoryId:", categoryId);
    getGuides(categoryId);
    setIdCategory(categoryId);
  };

  const items1 = [
    {
      key: "1",
      label: <p className="text-lg font-semibold">Food:</p>,
      children: (
        <p className="w-full">
          {guide[0]?.idFood?.map((food) => (
            <li key={food._id} className="mb-4 ml-9">
              <div className="flex gap-4">
                <img
                  src={food.urlImage}
                  alt={food.nameFood}
                  className="object-cover w-32 h-32 mt-2"
                />
                <div>
                  <p className="text-xl font-bold capitalize">
                    {food.nameFood}
                  </p>
                  <p>{food.description}</p>
                </div>
              </div>
            </li>
          ))}
        </p>
      ),
    },
    {
      key: "2",
      label: <p className="text-lg font-semibold">Medicine:</p>,
      children: (
        <p className="w-full">
          {guide[0]?.idMedicine?.map((medicine) => (
            <li key={medicine._id} className="mb-4 ml-9">
              <div className="flex gap-4">
                <img
                  src={medicine.urlImage}
                  alt={medicine.nameMedicine}
                  className="object-cover w-32 h-32 mt-2"
                />
                <div>
                  <p className="text-xl font-bold capitalize">
                    {medicine.nameMedicine + "( " + medicine.types + " )"}
                  </p>
                  <p>
                    <span className="font-semibold">Cách dùng:</span>{" "}
                    {medicine.instruction}
                  </p>
                  <p>{medicine.description}</p>
                </div>
              </div>
            </li>
          ))}
        </p>
      ),
    },
    {
      key: "3",
      label: <p className="text-lg font-semibold">Note:</p>,
      children: <p className="ml-9">{guide[0]?.notes}</p>,
    },
  ];

  const items2 = [
    {
      key: "1",
      label: <p className="text-lg font-semibold">Food:</p>,
      children: (
        <p className="w-full">
          {guide[1]?.idFood?.map((food) => (
            <li key={food._id} className="mb-4 ml-9">
              <div className="flex gap-4">
                <img
                  src={food.urlImage}
                  alt={food.nameFood}
                  className="object-cover w-32 h-32 mt-2"
                />
                <div>
                  <p className="text-xl font-bold capitalize">
                    {food.nameFood}
                  </p>
                  <p>{food.description}</p>
                </div>
              </div>
            </li>
          ))}
        </p>
      ),
    },
    {
      key: "2",
      label: <p className="text-lg font-semibold">Medicine:</p>,
      children: (
        <p className="w-full">
          {guide[1]?.idMedicine?.map((medicine) => (
            <li key={medicine._id} className="mb-4 ml-9">
              <div className="flex gap-4">
                <img
                  src={medicine.urlImage}
                  alt={medicine.nameMedicine}
                  className="object-cover w-32 h-32 mt-2"
                />
                <div>
                  <p className="text-xl font-bold capitalize">
                    {medicine.nameMedicine + "( " + medicine.types + " )"}
                  </p>
                  <p>
                    <span className="font-semibold">Cách dùng:</span>{" "}
                    {medicine.instruction}
                  </p>
                  <p>{medicine.description}</p>
                </div>
              </div>
            </li>
          ))}
        </p>
      ),
    },
    {
      key: "3",
      label: <p className="text-lg font-semibold">Note:</p>,
      children: <p>{guide[1]?.notes}</p>,
    },
  ];

  const items3 = [
    {
      key: "1",
      label: <p className="text-lg font-semibold">Food:</p>,
      children: (
        <p className="w-full">
          {guide[2]?.idFood?.map((food) => (
            <li key={food._id} className="mb-4 ml-9">
              <div className="flex gap-4">
                <img
                  src={food.urlImage}
                  alt={food.nameFood}
                  className="object-cover w-32 h-32 mt-2"
                />
                <div>
                  <p className="text-xl font-bold capitalize">
                    {food.nameFood}
                  </p>
                  <p>{food.description}</p>
                </div>
              </div>
            </li>
          ))}
        </p>
      ),
    },
    {
      key: "2",
      label: <p className="text-lg font-semibold">Medicine:</p>,
      children: (
        <p className="w-full">
          {guide[2]?.idMedicine?.map((medicine) => (
            <li key={medicine._id} className="mb-4 ml-9">
              <div className="flex gap-4">
                <img
                  src={medicine.urlImage}
                  alt={medicine.nameMedicine}
                  className="object-cover w-32 h-32 mt-2"
                />
                <div>
                  <p className="text-xl font-bold capitalize">
                    {medicine.nameMedicine + "( " + medicine.types + " )"}
                  </p>
                  <p>
                    <span className="font-semibold">Cách dùng:</span>{" "}
                    {medicine.instruction}
                  </p>
                  <p>{medicine.description}</p>
                </div>
              </div>
            </li>
          ))}
        </p>
      ),
    },
    {
      key: "3",
      label: <p className="text-lg font-semibold">Note:</p>,
      children: <p>{guide[2]?.notes}</p>,
    },
  ];

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-[90%] mt-10 flex justify-between">
        <p>
          <span className="mb-1 mr-2 text-2xl font-semibold"> Category: </span>
          <select
            onChange={(e) => onChange(e.target.value)}
            className="px-2 py-1 border rounded"
            defaultValue={categoryInGuide[0]?._id}
          >
            {categoryInGuide.map((category) => (
              <option key={category._id} value={category._id}>
                {category.nameCategory}
              </option>
            ))}
          </select>
        </p>
        <div className="flex gap-5">
          <Modals
            icon={
              <PlusOutlined className="mr-5 text-2xl cursor-pointer hover:opacity-40" />
            }
            title="Vui lòng chọn loại heo bạn muốn tạo :"
            categoriesNotInGuide={categoriesNotInGuide}
          />
          <div
            onClick={() => navigate(`/update-guide/${idCategory}`)}
            className="bg-[#2e8a2f] text-white hover:opacity-80 hover:text-white inline-block px-4 py-2 rounded-md active:shadow-sm cursor-pointer text-justify"
          >
            Update guide
          </div>
        </div>
      </div>
      <div className="w-[90%] h-[80%] mt-10 bg-white rounded-2xl mb-10 2xl:mb-14 overflow-y-auto">
        <Tabs defaultActiveKey="1" centered type="card">
          <TabPane
            className="h-auto"
            tab={
              <div>
                <span>Stage 1</span>
              </div>
            }
            key="1"
          >
            <div>
              <div>
                <div className="ml-10">
                  <p className="text-xl font-bold text-center capitalize 2xl:text-3xl">
                    {guide[0]?.idStage?.nameStage}
                  </p>
                  <p>{guide[0]?.idStage?.description}</p>
                </div>
              </div>
              <Collapse items={items1} ghost />
            </div>
          </TabPane>
          <TabPane
            tab={
              <div>
                <span>Stage 2</span>
              </div>
            }
            key="2"
          >
            <div>
              <div>
                <div className="ml-10">
                  <p className="text-xl font-bold text-center capitalize 2xl:text-3xl">
                    {guide[1]?.idStage?.nameStage}
                  </p>
                  <p>{guide[1]?.idStage?.description}</p>
                </div>
              </div>
              <Collapse items={items2} ghost />
            </div>
          </TabPane>
          <TabPane
            tab={
              <div>
                <span>Stage 3</span>
              </div>
            }
            key="3"
          >
            <div>
              <div>
                <div className="ml-10">
                  <p className="text-xl font-bold text-center capitalize 2xl:text-3xl">
                    {guide[2]?.idStage?.nameStage}
                  </p>
                  <p>{guide[2]?.idStage?.description}</p>
                </div>
              </div>
              <Collapse items={items3} ghost />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Guide;
