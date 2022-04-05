const express = require("express");
const { createUser, loginUser } = require("../controllers/authController");
const { userIdentity, loginuser } = require("../helper/Schemas");
const { Validator } = require("../helper/Validator");

const router = express.Router();

router.post("/user-registration", Validator(userIdentity), createUser);
router.post("/login", Validator(loginuser), loginUser);
module.exports = router;
