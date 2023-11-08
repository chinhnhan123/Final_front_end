import axios from "../../http/index";

const getConversation = (id) => {
  return axios.get(`http://localhost:4000/api/conversation/${id}`);
};

const getChat = (id) => {
  return axios.get(`http://localhost:4000/api/chat/${id}`);
};

const createChat = (data) => {
  return axios.post(`http://localhost:4000/api/chat/`, data);
};

const createConversation = (data) => {
  return axios.post(`http://localhost:4000/api/conversation`, data);
};

const checkConversation = (data) => {
  return axios.post(`http://localhost:4000/api/conversation/check`, data);
};

export {
  getConversation,
  getChat,
  createChat,
  createConversation,
  checkConversation,
};
