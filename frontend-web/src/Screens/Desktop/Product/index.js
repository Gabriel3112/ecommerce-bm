import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { FaCartPlus } from "react-icons/fa";

import Carousel from "../../../Components/Carousel";

import "./style.css";
import { detailsProduct } from "../../../Actions/Product";

export default function ProductDesktop({ match }) {
  const [flipIcon, setFlipIcon] = useState(false);
  const [rot, setRot] = useState(0);
  const { transform } = useSpring({
    transform: `rotateZ(${flipIcon ? rot : rot}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  /// /////
  // Setando o produto por id
  const dispatch = useDispatch();
  const productId = match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  /// /////

  return (
    <div>
      {!loading ? (
        <div className="Product-Viewer">
          <div className="Image-Container">
            <Carousel Vertical ImagesArray={product.images} Miniature />
          </div>
          <div className="Information-Container">
            <div className="Header-Viewer">
              <div className="Name-Viewer">
                <h1>{product.name}</h1>
              </div>
            </div>
            <div className="Price-Viewer">
              <span>R$: {product.price}</span>
            </div>

            <div className="Buttons-Container">
              <button type="button" className="Buy-Button">
                Comprar agora
              </button>
              <button
                type="button"
                onClick={() => {
                  setFlipIcon(true);
                  setRot(rot + 360);
                  setFlipIcon(false);
                }}
                className="AddToCart-Button"
              >
                <div className="AddToCart-Icon">
                  <animated.div style={{ transform }}>
                    <FaCartPlus />
                  </animated.div>
                </div>
                <div className="AddToCart-Text">
                  <span>Adicionar ao carrinho</span>
                </div>
              </button>
            </div>
            <div className="Description-Viewer">
              <text>Descrição do produto: </text>
              <text>{product.description}</text>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
