import React from "react";
import { Tabs } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./style/detailPig.css";

const { TabPane } = Tabs;

const DetailPig = () => (
  <div className="m-2 sm:m-5 h-[90%]">
    <div className="flex">
      <div className="hidden sm:inline-block">
        <ArrowLeftOutlined className="mr-8 text-2xl" />
      </div>
      <div className="flex">
        <img
          src="https://thuthuatnhanh.com/wp-content/uploads/2022/08/hinh-anh-avatar-luffy-mac-do-kimono.jpg"
          alt="img-pig"
          className="rounded-md w-28 sm:w-40 aspect-[4/3]"
        />
        <div className="ml-5">
          <p className="text-2xl font-bold">Pig nhà tuâns</p>
          <p>Quantity: 20</p>
        </div>
      </div>
    </div>
    <div className="h-[75%] min-h-[300px] bg-white rounded-lg mt-7 mx-9">
      <Tabs defaultActiveKey="1" centered type="card">
        <TabPane
          className="w-40"
          tab={
            <div>
              <span>Stage 1</span>
            </div>
          }
          key="1"
        >
          <div>
            <h1>Your content of Tab 1</h1>
            <p>This is your content of Tab 1</p>
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
            <h1>Your content of Tab 2</h1>
            <p>This is your content of Tab 2</p>
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
            <h1>Your content of Tab 3</h1>
            <p>This is your content of Tab 3</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
);

export default DetailPig;
