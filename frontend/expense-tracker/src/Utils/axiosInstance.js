import axios from 'axios';
import {BASE_URL} from '../Utils/apiPath'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',  
  },
});   

//request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any request modifications here
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can add any response modifications here
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login

      console.error('Unauthorized access - redirecting to login');
      window.location.href = '/login';  // Redirect to login page
      // You can add logic to redirect to the login page here
    }else if (error.response && error.response.status === 403) {
      // Handle forbidden access
      console.error('Forbidden access - you do not have permission to perform this action');
    } else if (error.response && error.response.status === 404) {
      // Handle not found
      console.error('Resource not found - please check the URL');
    }
    else if (error.response && error.response.status === 500) {
      // Handle server error
      console.error('Server error - please try again later');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
  