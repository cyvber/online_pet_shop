const express = require("express");
const { 
   addUser,
   userLoginAuthentication,
} = require("../controllers/userController");

const router = express.Router();



router.post("/add-user", addUser);
router.post("/login", userLoginAuthentication);

module.exports = router;
