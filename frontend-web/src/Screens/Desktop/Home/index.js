import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../../Components/Product";

import "./style.css";

import { listProducts } from "../../../Actions/Product";

function HomeDesktop() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className="Main-Viewer">
      {!loading
        ? products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        : null}
    </div>
  );
}

export default HomeDesktop;
