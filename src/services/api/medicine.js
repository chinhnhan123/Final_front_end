import axios from "../../http/index";

const getMedicine = () => {
  return axios.get(`http://localhost:4000/api/medicine`);
};

const getMedicineById = (id) => {
  return axios.get(`http://localhost:4000/api/medicine/${id}`);
};

const createMedicine = (data) => {
  return axios.post(`http://localhost:4000/api/medicine`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateMedicine = (id, data) => {
  return axios.put(`http://localhost:4000/api/medicine/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteMedicine = (id) => {
  return axios.delete(`http://localhost:4000/api/medicine/${id}`);
};

export {
  getMedicine,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
