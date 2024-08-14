import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./StarRating"; // Adjust the import path as necessary

const Courses = () => {
  const [data, setData] = useState([]); // for fetching data
  const [loading, setLoading] = useState(true); // for fetching data
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(300); // Adjust scroll amount as needed

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/courses`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
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
              className="bg-white p-4 shadow-md rounded-md flex-shrink-0"
            >
              <img
                src={`http://localhost:8080/${course.thumbnail}`} // Adjust URL if necessary
                className="w-full h-40 object-cover rounded-md"
                onError={(e) =>
                  (e.target.src = "/path/to/placeholder-image.jpg")
                } // Optional: Placeholder image on error
              />
              <div className="flex justify-between items-center mt-4">
                <h3 className="font-bold text-lg">{course.courseTitle}</h3>
                <StarRating defaultRating={2} />{" "}
                {/* Adjust defaultRating as needed */}
              </div>
              <p className="mt-2 text-gray-600">{course.courseDescription}</p>
              <p className="mt-2 text-gray-500">Category: {course.category}</p>
              <p className="mt-2 text-gray-700">Price: ${course.price}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                Enroll Now
              </button>
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
