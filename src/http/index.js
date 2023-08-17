import axios from "axios";
axios.interceptors.request.use(
  function (request) {
    const token = localStorage.getItem("access_token");
    request.headers = { access_token: token };
    return request;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axios;
