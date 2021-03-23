import React, { useRef, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import "./style.css";

export default function CarouselComponent({
  ImagesArray,
  Vertical,
  Miniature,
}) {
  let scrollAmount = 0;
  const [imgPos, setImgPos] = useState(0);
  const images = ImagesArray;
  const scrollMiniature = useRef(null);
  let i = 0;
  function HandleScrollLeft() {
    if (scrollAmount < 0) {
      scrollAmount = 0;
    }
    scrollMiniature.current.scrollTo({
      top: scrollAmount,
      behavior: "smooth",
    });
  }
  function HandleScrollRight() {
    scrollMiniature.current.scrollTo({
      top: (scrollAmount -= scrollMiniature.current.clientWidth),
      behavior: "smooth",
    });
  }

  return (
    <div className="Carousel-Container">
      <div className="Carousel-Miniature-Container">
        <div
          className="Carousel-Controls-Miniature-Image"
          onClick={() => {
            HandleScrollRight();
          }}
          aria-hidden="true"
          role="button"
        >
          <FaArrowUp />
        </div>
        <div
          ref={scrollMiniature}
          className={Vertical ? "Vertical" : "Horizontal"}
        >
          {images.map((image, index) => {
            i = index;
            return (
              <img
                key={i}
                src={image}
                onMouseEnter={() => setImgPos(index)}
                className={`${Miniature ? "Miniature-Image" : ""}  ${
                  index === imgPos ? "Selected" : ""
                }`}
                alt=""
              />
            );
          })}
        </div>
        <div
          className="Carousel-Controls-Miniature-Image"
          onClick={() => {
            HandleScrollLeft();
          }}
          aria-hidden="true"
        >
          <FaArrowDown />
        </div>
      </div>
      <div className="Carousel-Image-Viewer">
        <img src={images[imgPos]} alt={imgPos} />
      </div>
    </div>
  );
}
