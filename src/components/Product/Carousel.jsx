import { React, useState, useEffect } from "react";

import classNames from "classnames";
import { useFetchProduct } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { useParams } from "react-router-dom";

const Carousel = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { slug } = useParams();

  const { data: { data: product = {} } = {} } = useFetchProduct(slug);

  const { imageUrl, imageUrls } = product;

  const images = [imageUrl, ...imageUrls];

  const handleNext = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);

  const handlePrevious = () =>
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Button
          className="focus-within:ring-0 shrink-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          height="250px"
          src={images[currentIndex]}
          width="250px"
        />
        <Button
          className="focus-within:ring-0 shrink-0 hover:bg-transparent"
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
              "neeto-ui-border-black neeto-ui-rounded-full border h-3 w-3",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
