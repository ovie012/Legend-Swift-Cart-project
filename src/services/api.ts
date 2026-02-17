import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchProducts = async (limit = 12, skip = 0) => {
  const { data } = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return data;
};

export const fetchProductById = async (id: string | number) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const searchProducts = async (query: string, limit = 12, skip = 0) => {
  const { data } = await api.get(`/products/search?q=${query}&limit=${limit}&skip=${skip}`);
  return data;
};

export const fetchProductsByCategory = async (category: string, limit = 12, skip = 0) => {
  const { data } = await api.get(`/products/category/${category}?limit=${limit}&skip=${skip}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await api.get('/products/categories');
  return data;
};

export default api;
