const express = require("express");

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/:userId", checkAuth, UserController.getUser);

router.put("/:userId", checkAuth, UserController.updateUser);
module.exports = router;