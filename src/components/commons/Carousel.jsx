import { React, useState } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ title, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);

  const handlePrevious = () =>
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );

  const handleDotClick = index => setCurrentIndex(index);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          height="350px"
          src={images[currentIndex]}
          width="350px"
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={handleNext}
        />
      </div>
      <div className="flex space-x-1">
        {images.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
