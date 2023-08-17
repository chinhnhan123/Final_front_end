import axios from "axios";

const loginAPI = async (config, dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth/login",
      config
    );
    localStorage.setItem("access_token", res.data.handleToken);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.payload });
    return res.data.payload;
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

const registerAPI = (config) => {
  return axios.post("http://localhost:4000/api/auth/register", config);
};

export { loginAPI, registerAPI };
