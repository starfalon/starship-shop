import axios from "axios";

// basURL för alla api-anrop till backenden
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// lägger automatiskt till JWT-token i headers om användaren är inloggad
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// pprodukter
export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);

// orders
export const createOrder = (orderData) => API.post("/orders", orderData);

// Auth
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);
export const getCurrentUser = () => API.get("/users/current");
