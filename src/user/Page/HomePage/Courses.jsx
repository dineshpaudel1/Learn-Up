import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../StarRating";
import { fetchCourses } from "../../../components/Apis/CourseApi"; // Import the API function

const Courses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollAmount] = useState(300);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const courses = await fetchCourses();
      setData(courses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrev = () => {
    const container = document.getElementById("courses-container");
    container.scrollLeft -= scrollAmount;
  };

  const handleNext = () => {
    const container = document.getElementById("courses-container");
    container.scrollLeft += scrollAmount;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800">Our Courses</h2>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-10"
          onClick={handlePrev}
        >
          &#8592;
        </button>
        <div
          id="courses-container"
          className="flex overflow-x-auto space-x-6 pb-4 scroll-smooth"
        >
          {data.map((course) => (
            <div
              key={course.id}
              className="bg-white p-4 shadow-md rounded-md flex-shrink-0 w-64 h-80" // Fixed width and height
            >
              <Link to={`/coursedetail/${course.id}`}>
                <img
                  src={`http://localhost:8080/${course.thumbnail}`}
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) =>
                    (e.target.src = "/path/to/placeholder-image.jpg")
                  }
                  alt="Course Thumbnail"
                />
                <div className="mt-4">
                  <h3 className="font-bold text-lg line-clamp-1">
                    {course.courseTitle}
                  </h3>
                </div>
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {course.courseDescription}
                </p>
                <p className="mt-2 text-gray-500 text-xs">
                  Category: {course.category}
                </p>
                {/* Flex container for rating, price, and button */}
                <div className="flex items-center justify-between">
                  <StarRating defaultRating={course.rating} />
                  <button className="bg-gray-800 text-white px-4 py-1 rounded-md">
                    Enroll
                  </button>
                </div>
                <p className="text-gray-700 text-sm">NRS {course.price}</p>
              </Link>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-10"
          onClick={handleNext}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Courses;
