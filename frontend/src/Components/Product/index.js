import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import "./style.css";

function ProductComponent({ product }) {
  const [hover, setHover] = useState(false);
  const showingName = useSpring({
    paddingBottom: hover ? "5%" : "0px",
    height: hover ? "25%" : "0px",
    opacity: hover ? 1 : 0,
  });
  return (
    <Link to={`/produto/${product._id}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        key={product._id}
        className="Product-Container"
      >
        <div className="Product-Image-Container">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="Product-Information-Container">
          <div className="Product-Price-Container">
            <span>
              {product.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
        <animated.div style={showingName} className="Product-Name-Container">
          <span>{product.name}</span>
        </animated.div>
      </div>
    </Link>
  );
}

export default ProductComponent;
