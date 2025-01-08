const express = require("express");
const {
    placeOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getOrdersByStatus,
    searchOrdersByDate,
    calculateTotalSales,
    addItemToOrder,
    removeItemFromOrder,
} = require("../controllers/orderController");

const router = express.Router();


router.post("/place-order", placeOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);
router.get("/status/:status", getOrdersByStatus);
router.post("/search", searchOrdersByDate);
router.get("/sales", calculateTotalSales);
router.patch("/:id/add-item", addItemToOrder);
router.patch("/:id/remove-item", removeItemFromOrder);

module.exports = router;
