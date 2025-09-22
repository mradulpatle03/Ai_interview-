import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const instance = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (data) => {
  const res = await instance.post("/signup", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await instance.post("/login", data);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get("http://localhost:5000/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProfile = async (token, data) => {
  const res = await axios.put("http://localhost:5000/api/user/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
