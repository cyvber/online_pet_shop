const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true,},
    name: {type: String, required: true },
    hebrew_name: { type: String },
    logo: { type: String, required: true },
    website: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Brand", BrandSchema);
