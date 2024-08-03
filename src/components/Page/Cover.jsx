import React, { useState, useEffect } from "react";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";

const images = [bg1, bg2, bg3];

const Cover = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!manualOverride) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [manualOverride]);

  const handlePrev = () => {
    setManualOverride(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    // Reset manualOverride after 1 second to resume automatic slideshow
    setTimeout(() => setManualOverride(false), 1000);
  };

  const handleNext = () => {
    setManualOverride(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    // Reset manualOverride after 1 second to resume automatic slideshow
    setTimeout(() => setManualOverride(false), 1000);
  };

  return (
    <div
      className="relative text-white transition-all duration-1000"
      style={{
        height: "400px",
        width: "100%",
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-0 z-1"></div>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
        onClick={handlePrev}
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Cover;
