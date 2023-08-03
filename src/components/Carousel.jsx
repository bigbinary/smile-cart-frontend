import { React, useState } from "react";

import { Left, Right } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import classNames from "classnames";

const Carousel = ({ title, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleDotClick = index => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center">
        <Button
          className="shrink-0"
          icon={Left}
          style="text"
          onClick={handlePrev}
        />
        <img
          alt={title}
          height="350px"
          src={images[currentIndex]}
          width="350px"
        />
        <Button
          className="shrink-0"
          icon={Right}
          style="text"
          onClick={handleNext}
        />
      </div>
      <div className="flex flex-row space-x-1">
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
