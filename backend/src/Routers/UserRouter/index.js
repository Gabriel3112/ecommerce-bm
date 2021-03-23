import express from "express";
//import metadata from "gcp-metadata";
//import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../../models/UserModel/index.js";
import { generateToken } from "../../../utils.js";

//const oAuth2Client = new OAuth2Client();

const UserRouter = express.Router();

UserRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(201).send({
          auth: true,
          token: token,
        });
        return;
      }
    }
    res.status(401).send({ auth: false, message: "Email ou senha invalido." });
  })
);

function VerifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .json({ auth: false, message: "Token nothing provided." });

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed authentication." });

    req.decoded = decoded;
    next();
  });
}

UserRouter.get(
  "/profile",
  VerifyToken,
  expressAsyncHandler(async (req, res, next) => {
    res.status(200).send(req.decoded);
  })
);

UserRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    await user.save();
    const token = generateToken(user);
    res.status(201).send({
      auth: true,
      token: token,
    });
  })
);

UserRouter.put(
  "/newAddress",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
      user.addresses.push({
        name: req.body.address.name,
        cep: req.body.address.cep,
        rua: req.body.address.rua,
        bairro: req.body.address.bairro,
        cidade: req.body.address.cidade,
        uf: req.body.address.uf,
      });
      await user.save();
    }
  })
);

UserRouter.put(
  "/addHistory",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
      user.history.remove(req.body.productId);
      if (user.history.every((item) => item != req.body.productId)) {
        user.history.push(req.body.productId);
        await user.save();
      }
    }
  })
);

UserRouter.get(
  "/cart",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.query.id);
    if (user) {
      res.send(user.cart);
    }
  })
);

UserRouter.put(
  "/removeCart",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
      user.cart.remove({ id: req.body.productId });
      await user.save();
    }
  })
);

UserRouter.put(
  "/addCart",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    console.log(req.body.productId);
    console.log();
    if (user) {
      if (user.cart.every((item) => item.id != req.body.productId)) {
        user.cart.push({
          id: req.body.productId,
          quantity: req.body.quantity,
        });
      } else {
        user.cart.map((item) => {
          if (
            item.id == req.body.productId &&
            item.quantity != req.body.quantity
          ) {
            item.quantity = req.body.quantity;
          }
        });
      }
      await res.status(200);
      await user.save();
    }
  })
);
export default UserRouter;
