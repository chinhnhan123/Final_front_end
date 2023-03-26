import axios from "axios";
const getAccountById = (id) => {
  return axios.get(`http://localhost:4000/api/admin/account/${id}`);
};

export { getAccountById };
