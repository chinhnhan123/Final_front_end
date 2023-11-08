import axios from "../../http/index";

const getCategory = () => {
  return axios.get(`http://localhost:4000/api/category`);
};

const getCategoryById = (id) => {
  return axios.get(`http://localhost:4000/api/category/${id}`);
};

const getCategoryInGuide = () => {
  return axios.get(`http://localhost:4000/api/category/category-in-guide`);
};

const getCategoryNotInGuide = () => {
  return axios.get(`http://localhost:4000/api/category/category-not-in-guide`);
};

const createCategory = (data) => {
  return axios.post(`http://localhost:4000/api/category`, data);
};

const updateCategory = (id, data) => {
  return axios.put(`http://localhost:4000/api/category/${id}`, data);
};

const deleteCategory = (id) => {
  return axios.delete(`http://localhost:4000/api/category/${id}`);
};

export {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryInGuide,
  getCategoryNotInGuide,
};
