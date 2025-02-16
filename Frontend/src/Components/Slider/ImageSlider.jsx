import React, { useState, useEffect } from "react";
import "./imageslider.css";

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  // Go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev + 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="slider-text">
        {/* <h2>Image Slider</h2>  */}
       <div className="text-containt">
        <h3>Entrust your health our doctors</h3>
        <h1>Medical services that
        you can trust</h1>
        <div className="text-btn">Read more</div>
       </div>
      </div>
      <div className="slider">
        <div
          className="slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index}`} />
          ))}
        </div>
        {/* <button className="prev" onClick={prevSlide}>
        &#10094;
        </button>
        <button className="next" onClick={nextSlide}>
        &#10095;
        </button> */}
      </div>
    </>
  );
};

export default ImageSlider;
