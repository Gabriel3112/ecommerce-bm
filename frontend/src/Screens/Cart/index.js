import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { addToCart, getCart, removeFromCart } from "../../Actions/Cart";

import "./style.css";
import "../../global.css";
import WarningComponent from "../../Components/Warning";

export default function CartScreen({ history }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { info } = user;
  const cart = useSelector((state) => state.cart);
  const { loading } = cart;
  const [itens] = useState(cart.itens);
  const itemComp = createRef();

  const HandleRemoveProduct = (id) => {
    dispatch(removeFromCart(info.id, id));
  };
  const [qty, setQty] = useState(0);
  const qtyItem = useMemo(
    () => itens.reduce((acc, curr) => acc + curr.quantity, 0),
    [itens]
  );
  /*  0 = neutral
      1 = increasing
      2 = decreasing */

  const [nameFilter, setNameFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState(0);
  const [quantityFilter, setQuantityFilter] = useState(0);

  function ArrowFilter({ filter }) {
    if (filter === 1) {
      return <FaArrowUp />;
    }
    if (filter === 2) {
      return <FaArrowDown />;
    }

    return null;
  }

  const handleCheckout = () => {
    history.push("/login?redirecionar=envio");
  };

  useEffect(() => {
    if (!info) {
      history.push("/login?redirecionar=carrinho");
    } else {
      dispatch(getCart(info.id));
      console.log(itens);
      setQty(itens.reduce((acc, curr) => acc + curr.quantity, 0));
      console.log(qtyItem);
    }
  }, [dispatch]);

  const handleIncreaseQuantity = useCallback(
    (id, quantity) => {
      dispatch(addToCart(info.id, id, quantity));
      setTimeout(() => {
        dispatch(getCart(info.id));
        setQty(itens.reduce((acc, curr) => acc + curr.quantity, 0));
      }, 1000);
    },
    [dispatch]
  );

  return (
    <div className="flex center collum font-size-15">
      <div className="flex center row cart-container">
        {qtyItem > 0 ? (
          <div className="flex start-center collum cart-list">
            <div className="flex margin-10">
              <h3 id="quantity">Total de produtos: {qtyItem}</h3>
            </div>
            <div className="flex space-between row width-100 cart-filter margin-top-10">
              <div
                onClick={() => {
                  setNameFilter(nameFilter > 1 ? 0 : nameFilter + 1);
                  setPriceFilter(0);
                  setQuantityFilter(0);
                }}
                type="button"
                aria-hidden="true"
              >
                <ArrowFilter filter={nameFilter} />
                <span>Nome</span>
              </div>
              <div
                onClick={() => {
                  setNameFilter(0);
                  setPriceFilter(priceFilter > 1 ? 0 : priceFilter + 1);
                  setQuantityFilter(0);
                }}
                type="button"
                aria-hidden="true"
              >
                <ArrowFilter filter={priceFilter} />

                <span>Preço</span>
              </div>
              <div
                onClick={() => {
                  setNameFilter(0);
                  setPriceFilter(0);
                  setQuantityFilter(
                    quantityFilter > 1 ? 0 : quantityFilter + 1
                  );
                }}
                type="button"
                aria-hidden="true"
              >
                <ArrowFilter filter={quantityFilter} />

                <span>Quantidade</span>
              </div>
            </div>
            <ul className="flex center collum width-100">
              {!loading
                ? itens
                    .sort((a, b) => {
                      if (nameFilter === 1) {
                        return 1 * a.name.localeCompare(b.name);
                      }
                      if (nameFilter === 2) {
                        return -1 * a.name.localeCompare(b.name);
                      }
                      if (priceFilter === 1) {
                        return b.price - a.price;
                      }
                      if (priceFilter === 2) {
                        return a.price - b.price;
                      }
                      if (quantityFilter === 1) {
                        return b.quantity - a.quantity;
                      }
                      if (quantityFilter === 2) {
                        return a.quantity - b.quantity;
                      }
                      return 0;
                    })
                    .map((item) => (
                      <li
                        ref={itemComp}
                        className="flex start-center cart-item width-100"
                      >
                        <div className="cart-item-image flex center">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="cart-item-name flex start-center">
                          <Link to={`/produto/${item.id}`}>{item.name}</Link>
                        </div>
                        <div className="cart-item-price flex center">
                          {item.price.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>

                        <div className="flex center row cart-item-quantity">
                          <input
                            type="number"
                            defaultValue={item.quantity}
                            min={1}
                            max={item.quantityInStock}
                            onBlur={(e) => {
                              if (e.target.value) {
                                if (e.target.value <= 0) {
                                  handleIncreaseQuantity(item.id, Number(1));
                                  e.target.value = 1;
                                } else if (
                                  e.target.value > item.quantityInStock
                                ) {
                                  handleIncreaseQuantity(
                                    item.id,
                                    Number(item.quantityInStock)
                                  );
                                  e.target.value = item.quantityInStock;
                                } else {
                                  handleIncreaseQuantity(
                                    item.id,
                                    Number(e.target.value)
                                  );
                                }
                              }
                            }}
                          />
                        </div>
                        <div
                          onClick={() => {
                            HandleRemoveProduct(item.id);
                          }}
                          role="button"
                          aria-hidden="true"
                          className="flex center item-remove"
                        >
                          <FaTimes />
                        </div>
                      </li>
                    ))
                : null}
            </ul>

            <div className="Cart-Info-Container">
              <h1>
                Valor total:{" "}
                {!loading
                  ? itens
                      .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                      .toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                  : 0}
              </h1>

              <button onClick={handleCheckout} type="button">
                Comprar
              </button>
            </div>
          </div>
        ) : (
          <WarningComponent
            type="Warning"
            width="50vw"
            height="3vw"
            fontWeight="500"
            borderRadius="20px"
          >
            <span>O seu carrinho está vazio.</span>
          </WarningComponent>
        )}
      </div>
    </div>
  );
}
