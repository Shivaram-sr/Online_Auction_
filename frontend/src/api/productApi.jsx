// src/api/productApi.js
import axiosInstance from './axiosInstance';

export const getAllProducts = async () => {
  return axiosInstance.get('/products');
};

export const createProduct = async (productData) => {
  return axiosInstance.post('/products', productData);
};

export const getMyProducts = async () => {
  return axiosInstance.get('/products/mine');
};

export const getProductById = async (id) => {
  return axiosInstance.get(`/products/${id}`);
};

