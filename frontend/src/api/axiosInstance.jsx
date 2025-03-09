import axios from 'axios';

// 1) Determine the Base URL
//    This sets the starting part of every request. If VITE_API_BASE_URL
//    is defined in your .env, use that. Otherwise, default to localhost.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

// 2) Create an Axios instance with default settings
//    - baseURL: all requests use this as a prefix
//    - headers: JSON data by default
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 3) Add a Request Interceptor
//    Before sending any request, run this code:
axiosInstance.interceptors.request.use(config => {
  // 3a) Look in localStorage for 'token'
  const token = localStorage.getItem('token');
  // 3b) If a token is found, attach it to the request headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // 3c) Return the updated config so the request is actually sent
  return config;
});

// 4) Export this custom instance
//    So anywhere in your code you can do: axiosInstance.get('/something')
export default axiosInstance;
