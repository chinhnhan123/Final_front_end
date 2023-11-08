import axios from "../../http/index";

const getHerd = () => {
  return axios.get(`http://localhost:4000/api/herd`);
};

const getHerdById = (id) => {
  return axios.get(`http://localhost:4000/api/herd/${id}`);
};

const getHerdByAccount = (id) => {
  return axios.get(`http://localhost:4000/api/herd/by-account/${id}`);
};

const createHerd = (data) => {
  return axios.post("http://localhost:4000/api/herd", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateHerd = (id, data) => {
  return axios.patch(`http://localhost:4000/api/herd/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteHerd = (id) => {
  return axios.delete(`http://localhost:4000/api/herd/${id}`);
};

export {
  getHerd,
  getHerdById,
  getHerdByAccount,
  createHerd,
  updateHerd,
  deleteHerd,
};
