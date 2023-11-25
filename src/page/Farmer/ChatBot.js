import React, { useState, useRef, useContext } from "react";
import Message from "../../components/messages/Message";
import { AndroidOutlined } from "@ant-design/icons";
import { Divider, Spin } from "antd";
import axios from "axios";
import { AuthContext } from "../../context/auth/AuthContext";
// import prompt from "./dataPrompt";
console.log("🚀 ~ file: ChatBot.js:8 ~ prompt:", prompt);
// const API_KEY = "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";
const API_KEY = "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";

const instance = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});
const ChatBot = () => {
  const inputMessage = useRef();
  const [messages, setMessages] = useState([
    {
      message: "Xin chào",
      sender: "ChatGPT",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo-0301",
      messages: [...apiMessages],
      max_tokens: 450,
      temperature: 0.3,
      top_p: 1,
    };

    const res = await instance.post("/chat/completions", apiRequestBody);
    setLoading(false);
    if (res.status === 200) {
      const newMessage = {
        message: res.data.choices[0].message.content,
        direction: "incoming",
        sender: "ChatGPT",
      };
      const newMessages = [...chatMessages, newMessage];
      setMessages(newMessages);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = inputMessage.current.value;
    if (message) {
      handleSend(message);
      setLoading(true);
      inputMessage.current.value = "";
    }
  };

  return (
    <div className=" w-full h-full p-10 max-h-screen overflow-none bg-[#FEEFC7]">
      <div className="flex flex-col w-full h-[97%] pt-2 bg-white border-l rounded-lg shadow-lg ">
        <div className="h-12 w-full flex justify-center items-center gap-4">
          <AndroidOutlined className="text-xl 2xl:text-3xl" />
          <p className="font-semibold text-xl 2xl:text-3xl pb-0 mb-0">
            Chào mừng bạn đến với Chatgpt
          </p>
        </div>
        <Divider className="!mb-1" />
        {user.vip === true ? (
          <div className="flex flex-col flex-1 p-3 relative chat-area h-[80%]">
            <div className="flex-1 h-full overflow-y-scroll messages ">
              {messages?.map((m) => (
                <div>
                  <Message
                    key={1}
                    message={{ content: m.message }}
                    sender={m.sender === "ChatGPT" ? false : true}
                  ></Message>
                </div>
              ))}
              <Spin tip="Loading" spinning={loading} size="large">
                <div className="content" />
              </Spin>
            </div>

            <div className="pt-4 pb-6 flex-2">
              <div className="flex bg-white rounded-lg shadow write">
                <div className="flex items-center content-center p-4 pr-0 text-center flex-3">
                  <span className="block text-center text-gray-400 hover:text-gray-800">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </span>
                </div>
                <div className="flex-1">
                  <input
                    name="message"
                    className="block w-full px-4 py-4 bg-transparent outline-none"
                    rows="1"
                    placeholder="Type a message..."
                    autoFocus
                    ref={inputMessage}
                  ></input>
                </div>
                <div className="flex items-center content-center w-32 p-2 flex-2">
                  <div className="flex-1 text-center">
                    <span className="text-gray-400 hover:text-gray-800">
                      <span className="inline-block align-text-bottom">
                        <svg
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                        >
                          <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                  <div className="flex-1">
                    <button onClick={handleSubmit}>
                      <span className="inline-block align-text-bottom">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-blue-400"
                        >
                          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 p-3 relative chat-area h-[80%]">
            <p className="text-center text-2xl font-semibold text-red-500">
              Bạn cần trở thành tài khoản VIP để sử dụng tính năng này
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
