const express = require("express");
const { 
    getAllBrands, 
    addBrand, 
    removeBrand, 
} = require("../controllers/brandController");

const router = express.Router();


router.get("/allbrands", getAllBrands);
router.post("/addbrand", addBrand);
router.post("/removebrand", removeBrand);

module.exports = router;
