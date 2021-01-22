import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function ProductComponent({ product, key }) {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <div key={key} className="Product-Container">
        <div className="Product-Image-Container">
          <img
            src={product.images[0].image}
            alt={product.name}
            width="224px"
            height="224px"
          />
        </div>
        <div className="Product-Information-Container">
          <div className="Product-Name-Container">
            <span>{product.name}</span>
          </div>

          <div className="Product-Price-Container">
            <span>R$: {product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductComponent;
