// CourseApi.jsx
export const fetchCourses = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users/courses");
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

// Function to delete a course by ID with an access token
export const deleteCourse = async (id, accessToken) => {
  try {
    const response = await fetch(`http://localhost:8080/api/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the request
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete course");
    }
    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    return false;
  }
};
