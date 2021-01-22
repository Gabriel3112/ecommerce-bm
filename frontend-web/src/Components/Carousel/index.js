import React, { createRef, useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { animated, useSpring } from "react-spring";

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

  function HandleScrollLeft() {
    scrollMiniature.current.scrollTo({
      top: (scrollAmount += scrollMiniature.current.clientWidth),
      behavior: "smooth",
    });
    if (scrollAmount < 0) {
      scrollAmount = 0;
    }
  }

  function HandleScrollRight() {
    scrollMiniature.current.scrollTo({
      top: (scrollAmount -= scrollMiniature.current.clientWidth),
      behavior: "smooth",
    });
  }

  const { Y } = useSpring({
    Y: `calc(${scrollAmount}%)`,
  });

  return (
    <div className="Carousel-Container">
      <div className="Miniature-Container">
        <div
          className="Controls-Miniature-Image"
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
          {images.map(({ image, id }, index) => (
            <img
              key={id}
              src={image}
              onMouseEnter={() => setImgPos(index)}
              className={`${Miniature ? "Miniature-Image" : ""}  ${
                index === imgPos ? "Selected" : ""
              }`}
              alt={id}
            />
          ))}
        </div>
        <div
          className="Controls-Miniature-Image"
          onClick={() => {
            HandleScrollLeft();
          }}
          aria-hidden="true"
        >
          <FaArrowDown />
        </div>
      </div>
      <div className="Image-Viewer">
        <img src={images[imgPos].image} alt={imgPos} />
      </div>
    </div>
  );
}
