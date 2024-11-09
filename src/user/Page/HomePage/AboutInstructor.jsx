import React, { useState } from "react";
import jimImage from "../../../assets/teacher.png";
import janeImage from "../../../assets/teacher.png";
import johnImage from "../../../assets/teacher.png";

const AboutInstructor = () => {
  const instructors = [
    {
      name: "Dinesh Paudel",
      title: "Principal",
      location: "Lalitpur",
      image: jimImage,
      quote: `Thanks to Learn Up IT Head, Booz Allen has armed our workforce,
              specifically its data scientists, with highly relevant and in-demand
              tech skills that are enabling consultants to stay ahead of big data
              trends and raise the bar on proficiency, skills, and competencies to
              meet client demand.`,
    },
    {
      name: "Jane Doe",
      title: "Senior Instructor",
      location: "Kathmandu",
      image: janeImage,
      quote: `Learn Up has provided me with the platform to share knowledge and
              skills that help our students excel in their fields and stay 
              competitive in the industry.`,
    },
    {
      name: "John Smith",
      title: "Instructor",
      location: "Pokhara",
      image: johnImage,
      quote: `Working with students at Learn Up has been a transformative experience,
              allowing us to mold future leaders with cutting-edge tech skills.`,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % instructors.length);
      setFade(true);
    }, 300); // Adjust to match the transition duration
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + instructors.length) % instructors.length
      );
      setFade(true);
    }, 300);
  };

  const { name, title, location, image, quote } = instructors[currentIndex];

  return (
    <div className="flex bg-custom-yellow flex-col items-center bg-gray-50 py-[20px]">
      <h1 className="text-3xl font-bold p-[10px]">
        Our GoldMedalist Instructors
        <div className="mx-auto flex mt-2 w-16 h-1 bg-[#8594] rounded-full"></div>
      </h1>

      <div className="relative max-w-3xl w-full">
        <div
          className={`transition-opacity transform duration-300 ${
            fade ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          } flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-8 text-left`}
        >
          {/* Left Side: Testimonial Text */}
          <div className="md:w-2/3 pr-6">
            <p className="text-gray-800 text-base leading-relaxed">
              <span className="text-2xl font-semibold">“</span>
              {quote}
            </p>
            <a
              href="#read-full-story"
              className="text-indigo-600 font-medium mt-3 block"
            >
              Read full story
            </a>
          </div>

          {/* Right Side: Image and Author Details */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start mt-6 md:mt-0">
            <img
              src={image}
              alt={name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="text-center md:text-left">
              <p className="font-bold text-gray-900">{name}</p>
              <p className="text-sm text-gray-600">{title}</p>
              <p className="text-sm text-gray-600">{location}</p>
            </div>
          </div>
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-lg"
        >
          &lsaquo;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-lg"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
};

export default AboutInstructor;
