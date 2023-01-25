const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
   {
      name: String,
      price: Number,
      description: String,
      category: String,
      rating: Number,
      supply: Number,
   },
   { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
