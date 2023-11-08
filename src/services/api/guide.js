import axios from "../../http/index";

const getGuide = () => {
  return axios.get(`http://localhost:4000/api/guide`);
};

const getGuideById = (id) => {
  return axios.get(`http://localhost:4000/api/guide/${id}`);
};

const getGuideByCategory = (idCategory) => {
  return axios.get(`http://localhost:4000/api/guide/${idCategory}`);
};

const createGuide = (data) => {
  return axios.post("http://localhost:4000/api/guide", data);
};

const updateGuide = (data) => {
  return axios.put("http://localhost:4000/api/guide", data);
};

export { getGuide, getGuideById, getGuideByCategory, createGuide, updateGuide };
