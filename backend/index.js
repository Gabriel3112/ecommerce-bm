import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import ProductRouter from "./src/Routers/ProductRouter/index.js";
import UserRouter from "./src/Routers/UserRouter/index.js";

const port = process.env.PORT || 5000;

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/binariomimos",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use("/api/products", ProductRouter);

app.use("/api/users", UserRouter);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
