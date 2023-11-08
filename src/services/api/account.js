import axios from "../../http/index";

const getAccountById = (id) => {
  return axios.get(`http://localhost:4000/api/admin/account/${id}`);
};

const getAccounts = () => {
  return axios.get("http://localhost:4000/api/admin/accounts");
};

const lockAccountAPI = (id, lockAccount) => {
  return axios.patch(`http://localhost:4000/api/admin/lock-account/${id}`, {
    lockAccount: !lockAccount,
  });
};

const updateAvatar = (id, data) => {
  return axios.patch(`http://localhost:4000/api/admin/avatar/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { getAccounts, getAccountById, lockAccountAPI, updateAvatar };
