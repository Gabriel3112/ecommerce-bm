import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../../models/ProductModel/index.js";

const ProductRouter = express.Router();

ProductRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const Products = await Product.find({});
    res.send(Products);
  })
);

ProductRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const Products = await Product.findById(req.params.id);
    if (Products) {
      res.send(Products);
    } else {
      res.status(404).send({ message: "Produto não encontrado." });
    }
  })
);

export default ProductRouter;
