import axiosInstance from './axiosInstance';

export const createCheckoutSession = async (data) => {
  return axiosInstance.post('/payments/checkout', data);
};



