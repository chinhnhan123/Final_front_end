/* eslint-disable react-hooks/exhaustive-deps */
import logo from "../assets/images/logo.png";
import User from "../components/messages/User";
import HeaderChat from "../components/messages/HeaderChat";
import Message from "../components/messages/Message";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { getChat, getConversation } from "../services/api/messageAPI";
import { AuthContext } from "../context/auth/AuthContext";
import socketIO from "socket.io-client";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accountId = searchParams.get("accountId");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const scrollRef = useRef();
  const inputMessage = useRef();
  const { user } = useContext(AuthContext);
  const socket = useRef();
  socket.current = socketIO.connect("http://localhost:4000");

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      console.log("🚀 ~ file: MessagePage.js:31 ~ data:", data);
      setArrivalMessage({
        sender: data.senderId,
        content: data.content,
        createdAt: new Date(),
      });
      // setMessages((mes) => [
      //   ...mes,
      //   {
      //     sender: data.senderId,
      //     content: data.content,
      //     createdAt: new Date(),
      //   },
      // ]);
    });
  }, []);

  useEffect(() => {
    console.log(
      "🚀 ~ file: MessagePage.js:46 ~ arrivalMessage:",
      arrivalMessage
    );
    arrivalMessage &&
      currentChat?.idAccount.includes(arrivalMessage.sender) &&
      setMessages((mes) => [...mes, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await getConversation(user.id);
        console.log("🚀 ~ file: MessagePage.js:49 ~ res:", res);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      const formattedUsers = users.map((user) => ({
        userId: user.userId,
        socketId: user.socketId,
      }));
      setAllUsers(formattedUsers);
    });
  }, []);
  useEffect(() => {
    const filteredUsers = allUsers.filter((user) => {
      return conversations.some((item) => item.idAccount.includes(user.userId));
    });
    setOnlineUsers(filteredUsers);
  }, [allUsers, conversations, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getChat(currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, conversations]);

  useEffect(() => {}, [currentChat]);

  // useEffect(() => {
  //   setCurrentChat(conversations[0]);
  // }, [conversations]);

  useEffect(() => {
    if (accountId && conversations.length > 0) {
      let chatIndex = -1;
      conversations.some((item, index) => {
        if (item.idAccount.includes(accountId)) {
          chatIndex = index;
          return true;
        }
        return false;
      });

      if (chatIndex !== -1) {
        setCurrentChat(conversations[chatIndex]);
        return;
      }
      return;
    }
    setCurrentChat(conversations[0]);
  }, [accountId, conversations]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = inputMessage.current.value;

    const message = {
      sender: user.id,
      content: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.idAccount.find(
      (account) => account !== user.id
    );

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      content: newMessage,
    });

    try {
      const res = await axios.post(`http://localhost:4000/api/chat/`, message);
      setMessages([...messages, res.data]);
      inputMessage.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex-1 w-full h-full max-h-screen bg-[#FEEFC7]">
      <div className="container flex flex-col w-full h-full p-7 main-body">
        <div className="flex flex-row flex-1 h-full main">
          <div className="hidden w-1/3 lg:block heading flex-2">
            <div className="flex flex-col mb-5">
              <div className="">
                <div className="p-2 pb-6 search flex-2">
                  <input
                    type="text"
                    className="block w-full px-3 py-2 !bg-white border border-gray-200 rounded-xl"
                    placeholder="Search"
                  />
                </div>
              </div>

              <div className="flex-col hidden pr-6 sidebar lg:flex flex-2">
                <div className="flex-1 h-full px-2">
                  {conversations?.map((c, index) => (
                    <div onClick={() => setCurrentChat(c)}>
                      <User
                        key={c._id}
                        logo={logo}
                        isChatting={currentChat?.idAccount.find(
                          (account) => account !== user.id
                        )}
                        userId={c.idAccount.find(
                          (account) => account !== user.id
                        )}
                        active={onlineUsers?.some(
                          (u) =>
                            u.userId ===
                            c.idAccount.find((account) => account !== user.id)
                        )}
                      ></User>{" "}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/3 h-[97%] pt-2 bg-white border-l rounded-lg shadow-lg ">
            <HeaderChat
              logo={logo}
              userId={currentChat?.idAccount.find(
                (account) => account !== user.id
              )}
              active={onlineUsers?.some(
                (u) =>
                  u.userId ===
                  currentChat?.idAccount.find((account) => account !== user.id)
              )}
            ></HeaderChat>

            <div className="flex flex-col flex-1 p-3 chat-area h-[80%]">
              <div className="flex-1 h-full overflow-y-scroll messages ">
                {messages?.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      key={m._id}
                      avatar={logo}
                      message={m}
                      sender={m.sender === user.id}
                    ></Message>
                  </div>
                ))}
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
                            strokeLineCap="round"
                            strokeLineJoin="round"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
