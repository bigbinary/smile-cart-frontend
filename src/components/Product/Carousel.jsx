import { React, useState, useEffect, useRef } from "react";

import classNames from "classnames";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { slug } = useParams();

  const intervalRef = useRef(null);

  const { data: product = {} } = useShowProduct(slug);

  const { imageUrl, imageUrls, title } = product;
  const images = append(imageUrl, imageUrls);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleNext, 3000);
  };

  const handleNext = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);

  const handlePrevious = () =>
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );

  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={() => {
            handlePrevious();
            resetTimer();
          }}
        />
        <img alt={title} className="w-48" src={images[currentIndex]} />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handleNext();
            resetTimer();
          }}
        />
      </div>
      <div className="flex space-x-1">
        {images.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
