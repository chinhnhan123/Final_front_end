// import axios from "../http";
import axios from "axios";
const getConversation = (id) => {
  return axios.get(`http://localhost:4000/api/conversation/${id}`);
};

const getChat = (id) => {
  return axios.get(`http://localhost:4000/api/chat/${id}`);
};

export { getConversation, getChat };
