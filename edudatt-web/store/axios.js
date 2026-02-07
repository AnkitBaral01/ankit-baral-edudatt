import axios from 'axios';
import CONSTANTS from '@/config/constants';
import { showError } from '@/lib/toast';

const API_BASE_URL = CONSTANTS.ENVIRONMENT.API.API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (axiosConfig) => {
    const token = localStorage.getItem('AUTH_TOKEN');

    const STUDENT_ID = localStorage.getItem('CURRENT_CHILD');

    if (token) {
      axiosConfig.headers['Authorization'] = `Bearer ${token}`;
    }
    if(STUDENT_ID) {
      axiosConfig.headers['Student'] = STUDENT_ID;
    }

    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if(response.data?.success) {
      return response.data;
    } else {
      return showError(response.data?.message || 'Something went wrong.');
    }
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // localStorage.clear();
        return showError('Your session has expired. Please log in again.');
      } else if (status === 403) {
        return showError(data?.message || 'You do not have permission to access this resource.');
      } else if (status === 404) {
        return showError(data?.message || 'The requested resource could not be found.');
      } else if (status >= 500) {
        return showError(data?.message || 'An error occurred on the server. Please try again later.');
      } else {
        return showError(data?.message || 'Something went wrong.');
      }
    } else {
      return showError('Please check your internet connection.');
    }
  }
);

/**
 * GET request
 * @param {string} url - API endpoint
 * @param {object} params - Query parameters
 * @returns {Promise} - Response data
 */
const get = (url, params = {}) => {
  return axiosInstance.get(url, { params });
};

/**
 * POST request
 * @param {string} url - API endpoint
 * @param {object} data - Request payload
 * @returns {Promise} - Response data
 */
const post = (url, data = {}) => {
  return axiosInstance.post(url, data);
};

/**
 * PUT request
 * @param {string} url - API endpoint
 * @param {object} data - Request payload
 * @returns {Promise} - Response data
 */
const put = (url, data = {}) => {
  return axiosInstance.put(url, data);
};


/**
 * PATCH request
 * @param {string} url - API endpoint
 * @param {object} data - Request payload
 * @returns {Promise} - Response data
 */
const patch = (url, data = {}) => {
  return axiosInstance.patch(url, data);
};

/**
 * DELETE request
 * @param {string} url - API endpoint
 * @param {object} params - Query parameters
 * @returns {Promise} - Response data
 */
const remove = (url, params = {}) => {
  return axiosInstance.delete(url, { params });
};

export default {
  get,
  post,
  put,
  patch,
  delete: remove,
};
