const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    product_type: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number },
    description: { type: String },
    discount_type: { type: String },
    date: { type: Date, default: Date.now() },
    on_discount: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    best_seller: { type: Boolean, default: false },
    total_orders: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", ProductSchema);
