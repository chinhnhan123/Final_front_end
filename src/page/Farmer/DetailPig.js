import React, { useState, useEffect } from "react";
import { Tabs, Collapse } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import "./style/detailPig.css";
import { getGuideByCategory } from "../../services/api/guide";
import { getHerdById } from "../../services/api/herd";

const { TabPane } = Tabs;

const DetailPig = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [guide, setGuide] = useState([]);
  const navigate = useNavigate();
  const getPigDetails = async () => {
    try {
      const res = await getHerdById(id);
      setData(res.data);
      getGuides(res.data.idCategory._id);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };

  const getGuides = async (categoryId) => {
    try {
      const guidesRes = await getGuideByCategory(categoryId);
      setGuide(
        guidesRes?.data.sort((a, b) => a.idStage.idStage - b.idStage.idStage)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPigDetails();
  }, []);

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
    <div className="m-2 sm:m-5 h-[90%]">
      <div className="flex">
        <div className="hidden sm:inline-block">
          <ArrowLeftOutlined
            onClick={() => navigate("/")}
            className="mr-8 text-2xl"
          />
        </div>
        <div className="flex">
          <img
            src={data?.urlImage}
            alt="img-pig"
            className="rounded-md w-28 sm:w-40 aspect-[4/3]"
          />
          <div className="ml-5">
            <p className="text-2xl font-bold">{data?.name}</p>
            <p>Quantity: {data?.quantity}</p>
          </div>
        </div>
      </div>
      <div className="w-[90%] h-[80%] bg-white rounded-lg mt-7 mx-9  overflow-y-auto">
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

export default DetailPig;
