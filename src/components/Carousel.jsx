import { useState } from "react";

const Carousel = (props) => {
  const { images } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  return (
    <div className="carousel w-full">
      {images.map((item, id) => {
        return (
          <div key={id} id={currentIndex} className="carousel-item relative w-full">
            <img src={item} className="mx-auto" width={500} height={400} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={currentIndex} onClick={handlePrev} className="btn btn-circle">
                ❮
              </a>
              <a href={currentIndex} onClick={handleNext} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
