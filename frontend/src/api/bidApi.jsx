import axiosInstance from './axiosInstance';

export const placeBid = async (productId, bidAmount) => {
  return axiosInstance.post(`/bids/${productId}`, { bidAmount });
};

export const getBidsForProduct = async (productId) => {
  return axiosInstance.get(`/bids/${productId}`);
};


