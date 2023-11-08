import React, { useContext } from "react";
import { MessageOutlined } from "@ant-design/icons";
import defaultAvatar from "../../assets/images/default-avatar.jpg";
import defaultImage from "../../assets/images/pig2.jpg";
import { useNavigate } from "react-router-dom";
import axios from "../../http/index";
import { AuthContext } from "../../context/auth/AuthContext";
import {
  checkConversation as checkConversationAPI,
  createConversation,
} from "../../services/api/messageAPI";

export default function TraderCard(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log("🚀 ~ file: TraderCard.js:12 ~ user:", user);

  const handleConversation = async () => {
    const data = { idAccount: [props.idAccount, user.id] };

    const checkConversation = await checkConversationAPI(data);
    if (checkConversation.data) {
      navigate(`/message?accountId=${props.idAccount}`);
      return;
    }
    const res = await createConversation(data);
    if (res.status === 200) {
      navigate("/message", { replace: true });
    }
  };

  return (
    <div className="w-full min-w-[300px] bg-white p-4 rounded-lg shadow-lg">
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
          <div className="flex justify-between">
            <p className="inline-block text-base max-w-[145px] truncate font-extralight ">
              {props.namePig || "đàn heo nái tháng 9"}
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
