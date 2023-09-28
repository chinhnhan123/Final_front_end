import React from "react";
import { MessageOutlined } from "@ant-design/icons";
import defaultAvatar from "../../assets/images/default-avatar.jpg";
import defaultImage from "../../assets/images/pig2.jpg";

export default function TraderCard(props) {
  console.log("🚀 ~ file: TraderCard.js:7 ~ props:", props);
  const handleConversation = () => {
    console.log(
      "🚀 ~ file: TraderCard.js:9 ~ handleConversation ~ handleConversation"
    );
  };

  return (
    <div className="w-full sm:w-[90%] min-w-[300px] bg-white p-4 rounded-lg shadow-lg">
      <div className="flex">
        <div>
          <img
            src={props.avatar ? props.avatar : defaultAvatar}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="w-full mb-3 ml-2">
          <h1 className="text-2xl font-semibold">
            {props.name || "Name pigs"}
          </h1>
          <div className="flex justify-between w-[90%]">
            <p className="inline-block text-base max-w-[190px] truncate font-extralight ">
              {props.namePig || "đàn heo nái tháng 9  đàn heo nái tháng 9"}
            </p>
            <p className="flex mr-2 text-base font-medium">
              Thể loại:{" "}
              <span className="ml-1 font-light">{props.category || "heo"}</span>
            </p>
          </div>
        </div>
      </div>
      <img
        src={props.image ? props.image : defaultImage}
        alt=""
        className="w-full h-[200px] object-cover rounded-lg "
      />
      <div>
        <div className="flex justify-between mt-2">
          <div className="flex gap-2 text-xl font-normal">
            <p>Quantity: {props.quantity || 0}</p>
          </div>
          <span onClick={handleConversation}>
            {" "}
            <MessageOutlined
              style={{ fontSize: "26px" }}
              className="cursor-pointer"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
