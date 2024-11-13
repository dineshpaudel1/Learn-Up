// CourseApi.jsx for fetching the data

export const fetchCourses = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users/courses");
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return await response.json();
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
        Authorization: `Bearer ${accessToken}`,
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

// Function to add a new course
export const addCourse = async (courseData, thumbnail, accessToken) => {
  const formData = new FormData();
  formData.append("course", JSON.stringify(courseData));
  formData.append("file", thumbnail);

  try {
    const response = await fetch("http://localhost:8080/api/admin/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

export const updateCourse = async (
  courseId,
  updatedCourseData,
  thumbnail,
  accessToken
) => {
  console.log("Access Token:", accessToken); // Log to confirm token is correct

  const formData = new FormData();
  formData.append("course", JSON.stringify(updatedCourseData));
  if (thumbnail) {
    formData.append("file", thumbnail);
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/${courseId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );



    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating course:", error);
    if (error.message.includes("401")) {
      console.error(
        "Authentication error: Access token might be missing or invalid."
      );
    }
    throw error;
  }
};
