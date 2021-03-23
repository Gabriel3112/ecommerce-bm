import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    addresses: [
      {
        name: String,
        cep: Number,
        rua: String,
        bairro: String,
        cidade: String,
        uf: String,
      },
    ],
    history: [{ type: String }],
    cart: [{ _id: false, id: String, quantity: Number }],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
