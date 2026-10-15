import axios from "axios";

const API = "http://localhost:3000";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API}/users`, userData);
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await axios.get(`${API}/users`, {
    params: { email }
  });

  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API}/users/${id}`);
  return response.data;
};

export const checkUsername = async (username) => {
  const response = await axios.get(`${API}/users`, {
    params: { username }
  });

  return response.data;
};

export const checkEmail = async (email) => {
  const response = await axios.get(`${API}/users`, {
    params: { email }
  });

  return response.data;
};