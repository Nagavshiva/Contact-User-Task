const express = require("express");
const router = express.Router();
const {  login } = require("../controllers/authcontroller");
const { verifyToken } = require("../middleware/auth");


// Public routes
// router.post("/register", register);
router.post("/login", login);


module.exports = router;