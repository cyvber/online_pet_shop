const express = require("express");
const { 
    getAllProducts, 
    removeAllProducts, 
    addProduct, 
    removeProduct, 
    updateProduct, 
    addDiscount, 
    removeDiscount,
    toggleProductAvailability,
    getProductById,
} = require("../controllers/productController");

const router = express.Router();


router.get("/allproducts", getAllProducts);
router.post("/removeproducts", removeAllProducts);
router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);
router.post("/updateproduct", updateProduct);
router.post("/adddiscount", addDiscount);
router.post("/removediscount", removeDiscount);
router.post("/toggleavailable", toggleProductAvailability);
router.get("/getproduct/:id", getProductById);


module.exports = router;
