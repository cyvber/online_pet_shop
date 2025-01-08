const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    date_created: { type: Date, default: Date.now() },
    last_login: { type: Date },
    tokenExpiration: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
