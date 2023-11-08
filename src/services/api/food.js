import axios from "../../http/index";

const getFood = () => {
  return axios.get(`http://localhost:4000/api/food`);
};

const getFoodById = (id) => {
  return axios.get(`http://localhost:4000/api/food/${id}`);
};

const createFood = (data) => {
  return axios.post("http://localhost:4000/api/food", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateFood = (id, data) => {
  return axios.patch(`http://localhost:4000/api/food/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteFood = (id) => {
  return axios.delete(`http://localhost:4000/api/food/${id}`);
};

export { getFood, getFoodById, createFood, updateFood, deleteFood };
