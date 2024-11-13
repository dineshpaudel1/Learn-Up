import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourses } from "../../../components/Apis/CourseApi";
import axios from "axios";
import StarRating from "../StarRating";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const handlePrev = () => {
    const container = document.getElementById("recommended-courses-container");
    container.scrollLeft -= 300;
  };

  const handleNext = () => {
    const container = document.getElementById("recommended-courses-container");
    container.scrollLeft += 300;
  };

  const getCourseAndRecommendations = async (courseId) => {
    const courses = await fetchCourses();
    const selectedCourse = courses.find(
      (course) => course.id === parseInt(courseId)
    );
    setCourse(selectedCourse || {});

    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/recommendations`
      );
      setRecommendedCourses(response.data);
    } catch (error) {
      console.error("Error fetching recommended courses:", error);
    }
  };

  useEffect(() => {
    getCourseAndRecommendations(id);
  }, [id]);

  const handleRecommendedCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
    getCourseAndRecommendations(courseId); // Update course details immediately
  };

  const handleEnroll = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      navigate("/enrollmentuser", { state: { course } });
    } else {
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
            <h3 className="text-xl font-semibold mt-4">Video Link</h3>
            <p>{course.videoLink || "No language specified."}</p>
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

        {/* Recommended Courses Section */}
        {recommendedCourses.length > 0 && (
          <section className="mt-8 container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              Recommended Courses
            </h2>
            <div className="relative flex items-center">
              {/* Previous Button */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-10"
                onClick={handlePrev}
              >
                &#8592;
              </button>

              {/* Horizontal Scrolling Container */}
              <div
                id="recommended-courses-container"
                className="flex overflow-x-auto space-x-6 pb-4 scroll-smooth"
              >
                {recommendedCourses.map((recommendedCourse) => (
                  <div
                    key={recommendedCourse.id}
                    className="bg-white p-4 shadow-md rounded-md flex-shrink-0 w-64 h-80"
                    onClick={() =>
                      handleRecommendedCourseClick(recommendedCourse.id)
                    }
                  >
                    <img
                      src={`http://localhost:8080/${recommendedCourse.thumbnail}`}
                      alt={recommendedCourse.courseTitle}
                      className="w-full h-32 object-cover rounded-md"
                      onError={(e) =>
                        (e.target.src = "/path/to/placeholder-image.jpg")
                      }
                    />
                    <div className="mt-4">
                      <h3 className="font-bold text-lg line-clamp-1">
                        {recommendedCourse.courseTitle}
                      </h3>
                    </div>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                      {recommendedCourse.courseDescription}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <button className="bg-blue-600 text-white py-1 px-4 rounded">
                        View Course
                      </button>
                      <StarRating defaultRating={recommendedCourse.rating} />
                    </div>
                    <p className="text-gray-700 text-sm mt-2">
                      NRS {recommendedCourse.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-10"
                onClick={handleNext}
              >
                &#8594;
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
