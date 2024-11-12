import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import TeacherImage from "../../../assets/teacher.webp";
import esewaimg from "../../../assets/payment logo/esewa.jpeg";
import khaltiimg from "../../../assets/payment logo/khalti.png";

const EnrollmentUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  const loggedInUsername = localStorage.getItem("username") || "Not available";
  const token = localStorage.getItem("token"); // Retrieve the access token
  const userrole = localStorage.getItem("role"); // Get the role from localStorage

  const videoLinks = {
    "The Complete Python Bootcamp From Zero to Hero in Python":
      "https://www.youtube.com/embed/rfscVS0vtbw",
    "C#Course": "https://www.youtube.com/embed/YrtFtdTTfv0",
  };

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleESewaPayment = () => {
    setSelectedPaymentMethod("eSewa");
    navigate("/sewa", { state: { course } });
  };

  const handleKhaltiPayment = () => {
    setSelectedPaymentMethod("Khalti");
    // Navigate or set up Khalti payment if needed
  };

  // Updated handleEnroll function to make the API call with token
  const handleEnroll = async () => {
    try {
      const enrollmentData = {
        username: loggedInUsername,
        role: localStorage.getItem("role"), // Send the user's role with enrollment data
        courseTitle: course.courseTitle,
        instructor: course.instructor,
      };

      const response = await axios.post(
        "http://localhost:8080/api/makeEnroll",
        enrollmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (response.data === "User is already enrolled in this course.") {
          alert("Already enrolled");
        } else {
          alert("Successfully enrolled");
        }
        console.log(response.data);
      } else {
        alert("Failed to enroll. Please try again.");
      }
    } catch (error) {
      console.error("Enrollment Error:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please log in again.");
      } else {
        alert("An error occurred during enrollment.");
      }
    }
  };

  const videoLink = videoLinks[course?.courseTitle] || null;

  return (
    <div className="bg-gray-100 p-8 mt-10 flex space-x-8">
      {/* Left Side: Enrollment Content */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Enrollment Details</h2>
        {course ? (
          <div className="mb-4">
            <div className="mt-4">
              <p className="font-semibold">Course Preview</p>
              {videoLink ? (
                <iframe
                  width="100%"
                  height="200"
                  src={videoLink}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md mb-4"
                ></iframe>
              ) : (
                <p>No video available for this course.</p>
              )}
            </div>
            <p>
              <strong>Title:</strong> {course.courseTitle}
            </p>
            <p>
              <strong>Description:</strong> {course.courseDescription}
            </p>
            <p>
              <strong>Category:</strong> {course.category}
            </p>
            <p>
              <strong>Price:</strong> NRS {course.price}
            </p>
            <p>
              <strong>Rating:</strong> {course.rating} ★
            </p>
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <p>
              <strong>Language:</strong> {course.language}
            </p>
            <p>
              <strong>Username:</strong> {loggedInUsername}
            </p>
          </div>
        ) : (
          <p>No course data available.</p>
        )}
        {course && (
          <div className="mb-4">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => setShowPaymentOptions(!showPaymentOptions)}
            >
              <span className="text-blue-600 font-bold">Payment Options</span>
              {showPaymentOptions ? (
                <FaAngleUp className="text-blue-600" />
              ) : (
                <FaAngleDown className="text-blue-600" />
              )}
            </div>
            {showPaymentOptions && (
              <div className="p-4 bg-gray-50 rounded-md shadow-inner border border-gray-200">
                <p className="text-lg font-semibold mb-3">
                  Choose Payment Method:
                </p>
                <div>
                  <button
                    onClick={handleESewaPayment}
                    className={`w-70 bg-white-600 ${
                      selectedPaymentMethod === "eSewa"
                        ? "bg-green-700"
                        : "hover:bg-green-700"
                    } text-white py-2 rounded transition duration-300`}
                  >
                    <img
                      src={esewaimg}
                      alt="eSewa"
                      className="w-70 h-10 object-cover rounded-md mb-2 px-9"
                    />
                  </button>
                  <button
                    onClick={handleKhaltiPayment}
                    className={`w-70 bg-white-600 ${
                      selectedPaymentMethod === "Khalti"
                        ? "bg-purple-700"
                        : "hover:bg-purple-700"
                    } text-white py-2 rounded transition duration-300`}
                  >
                    <img
                      src={khaltiimg}
                      alt="Khalti"
                      className="w-70 h-10 object-cover rounded-md mb-2 px-9"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <button
          onClick={handleEnroll}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded transition duration-300"
        >
          Enroll
        </button>
      </div>

      {/* Right Side: About Us Section */}
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="relative w-64 h-64 bg-yellow-700 flex items-center justify-center rounded-md">
          <img
            src={TeacherImage}
            alt="Instructor"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-10">
          <h2 className="text-3xl font-bold mb-4">About Instructor Details</h2>
          <p className="text-gray-700 mb-6 max-w-md">
            Instructors from around the world teach millions of learners on
            Udemy. We provide the tools and skills to teach what you love.
          </p>
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">
            Find Me on Linkedin
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentUser;
