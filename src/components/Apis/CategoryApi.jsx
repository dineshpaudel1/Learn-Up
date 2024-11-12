// Function to fetch categories from the API
export const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users/category");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
