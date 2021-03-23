import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import Carousel from "../../Components/Carousel";

import "./style.css";
import { detailsProduct } from "../../Actions/Product";
import WarningComponent from "../../Components/Warning";
import PopupComponent from "../../Components/Popup/index";
import { addToCart } from "../../Actions/Cart";

export default function ProductDesktop({ history, match }) {
  const [popup, setPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  /// /////
  // Setando o produto por id
  const dispatch = useDispatch();
  const productId = match.params.id;
  const productDetails = useSelector((state) => state.productDetails);

  const user = useSelector((state) => state.user);
  const { info } = user;

  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(detailsProduct(info ? info.id : false, productId));
  }, [dispatch, productId]);
  /// /////

  const HandleAddToCart = () => {
    dispatch(addToCart(info ? info.id : false, productId, quantity));
  };
  return (
    <div>
      {!loading && !error ? (
        <div className="Product-Viewer">
          <Carousel Vertical ImagesArray={product.images} Miniature />

          <PopupComponent show={popup} buttonClick={() => setPopup(false)}>
            Produto adicionado ao carrinho!
          </PopupComponent>

          <div className="Information-Container">
            <div className="Header-Viewer">
              <div className="Name-Viewer">
                <h1>{product.name}</h1>
              </div>
            </div>
            <div className="Price-Viewer">
              <span>
                {product.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <div className="Buttons-Container">
              <div className="Quantity-Container">
                <p>Quantidade: </p>
                <select
                  className="Quantity-Select"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {[...Array(product.quantityInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" className="Buy-Button">
                Comprar agora
              </button>
              <button
                type="button"
                onClick={() => {
                  if (info) {
                    setPopup(true);
                    HandleAddToCart();
                  } else {
                    history.push("/login?redirecionar=carrinho");
                    HandleAddToCart();
                  }
                }}
                className="AddToCart-Button"
              >
                <div className="AddToCart-Icon">
                  <FaCartPlus />
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
      ) : (
        <WarningComponent
          type="Danger"
          fontWeight="500"
          borderRadius="25px"
          height="10vw"
          width="100%"
        >
          {error}
        </WarningComponent>
      )}
    </div>
  );
}
