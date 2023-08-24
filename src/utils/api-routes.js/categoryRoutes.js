import axios from 'axios';
import { API_BASE_URL } from '../config';

export const addCategory = async (categoryData, headers) => {
  try {
    const response = await axios.post(`${API_BASE_URL}category`, categoryData, { headers: headers });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}category/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryId, headers) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}category/${categoryId}`, { headers: headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
