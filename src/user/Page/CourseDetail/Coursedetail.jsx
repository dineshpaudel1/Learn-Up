import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourses } from "../../../components/Apis/CourseApi";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      const courses = await fetchCourses();
      const selectedCourse = courses.find(
        (course) => course.id === parseInt(id)
      );
      setCourse(selectedCourse || {});
    };

    getCourse();
  }, [id]);

  // Enroll handler to check login status
  const handleEnroll = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      // If user is logged in, navigate to enrollment page with course details
      navigate("/enrollmentuser", { state: { course } });
    } else {
      // If user is not logged in, navigate to login page
      navigate("/login");
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 p-8 mt-9">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-blue-800 text-white p-6">
          <h1 className="text-3xl font-bold">
            {course.courseTitle || "Untitled Course"}
          </h1>
          <p className="mt-2">
            {course.courseDescription || "No description available."}
          </p>
          <div className="mt-4 flex items-center">
            <span className="ml-3 text-lg">
              {course.rating || "No rating"}{" "}
              <span className="text-yellow-300">★★★★☆</span>
            </span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row">
          <section className="lg:w-2/3 p-6">
            <h2 className="text-2xl font-bold mb-4">Course Category</h2>
            <p>{course.category || "No category specified."}</p>
            <h3 className="text-xl font-semibold mt-4">Instructor</h3>
            <p>{course.instructor || "No instructor specified."}</p>
            <h3 className="text-xl font-semibold mt-4">Language</h3>
            <p>{course.language || "No language specified."}</p>
          </section>

          <aside className="lg:w-1/3 p-6 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200">
            <img
              src={
                course.thumbnail
                  ? `http://localhost:8080/${course.thumbnail}`
                  : "/path/to/placeholder-image.jpg"
              }
              alt={course.courseTitle || "Course Thumbnail"}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="text-3xl font-bold mb-4">
              NRS {course.price || "0.00"}
            </div>
            <button
              onClick={handleEnroll}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mb-3 transition duration-300"
            >
              Enroll Now
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
