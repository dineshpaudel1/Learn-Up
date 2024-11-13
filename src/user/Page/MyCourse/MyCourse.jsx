import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserInfoProvider";
import TeacherImage from "../../../assets/teacher.webp"; // Add your teacher image path here

const MyCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [detailedCourses, setDetailedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const [userInfo] = useContext(UserContext);
  const userId = userInfo ? userInfo.id : localStorage.getItem("id");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/showEnroll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const userCourses = response.data.filter(
            (course) => course.userId === userId
          );
          setEnrolledCourses(userCourses);

          const detailedCourseData = await Promise.all(
            userCourses.map(async (course) => {
              const courseDetailResponse = await axios.get(
                `http://localhost:8080/api/users/${course.courseTitle}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return courseDetailResponse.data;
            })
          );

          setDetailedCourses(detailedCourseData);
        } else {
          setError("Failed to fetch enrolled courses.");
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        setError("An error occurred while fetching enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [token, userId]);

  if (loading) return <p>Loading enrolled courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 p-8 mt-10 flex space-x-8">
      {/* Left Side: Course Details */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>

        {detailedCourses.map((course) => (
          <div key={course.id} className="mb-6">
            <strong>Video:</strong>
            {course.videoLink ? (
              <iframe
                width="100%"
                height="200"
                src={course.videoLink}
                title="Course Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md mb-4"
              ></iframe>
            ) : (
              <p>No video available for this course.</p>
            )}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{course.courseTitle}</h3>
            </div>
            <p>
              <strong>Instructor Name:</strong> {course.instructor}
            </p>
            <p>
              <strong>Description:</strong> {course.courseDescription}
            </p>
            <p>
              <strong>Category:</strong> {course.category}
            </p>
            <p>
              <strong>Price:</strong> ${course.price}
            </p>
            <p>
              <strong>Rating:</strong> {course.rating} ★
            </p>

            <div className="mt-4">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded transition duration-300">
                Continue Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourse;
