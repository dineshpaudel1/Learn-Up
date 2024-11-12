// src/api/CategoryApi.jsx

import axios from "axios";

const CATEGORY_API_BASE_URL = "http://localhost:8080/api/users/category";

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the categories!", error);
    throw error;
  }
};

// Fetch a category by ID
export const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${CATEGORY_API_BASE_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};
