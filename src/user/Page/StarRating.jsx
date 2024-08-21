import React, { useState, useEffect } from "react";

const StarRating = ({ defaultRating }) => {
  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);

  // Update the rating when defaultRating changes
  useEffect(() => {
    setRating(defaultRating);
  }, [defaultRating]);

  return (
    <div className="flex  mt-2">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`text-2xl ${
              index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
