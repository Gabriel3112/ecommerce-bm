import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../Components/Product";

import "./style.css";

import { listProducts } from "../../Actions/Product";
import WarningComponent from "../../Components/Warning";

function HomeDesktop() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="Main-Viewer">
      {!loading && !error ? (
        products.map((product) => <Product product={product} />)
      ) : (
        <WarningComponent type="Danger">
          Não foi possível carregar os produtos. Erro: {error}
        </WarningComponent>
      )}
    </div>
  );
}

export default HomeDesktop;
