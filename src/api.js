import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const getProvinces = async () => {
  try {
    const response = await axios.get(`${backendURL}/getProvinces`);
    return response.data[0].results;
  } catch (err) {
    return err.response.data;
  }
};
export const getCities = async (id) => {
  try {
    const response = await axios.get(`${backendURL}/getCities/${id}`);
    return response.data[0].results;
  } catch (err) {
    return err.response.data;
  }
};
export const getPostalCode = async (id) => {
  try {
    const response = await axios.get(`${backendURL}/getPostalCode/${id}`);
    return response.data[0].results.postal_code;
  } catch (err) {
    return err.response.data;
  }
};

export const getUser = async (token) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(`${backendURL}/auth/me`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${backendURL}/product`);
    return response.data.products;
  } catch (err) {
    return err.response.data;
  }
};
export const getProduct = async (slug) => {
  try {
    const response = await axios.get(`${backendURL}/product/${slug}`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
