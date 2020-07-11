const express = require("express");

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/getuser/:userId", checkAuth, UserController.getUser);

router.get("/:name/:email/:secret", UserController.verify);

router.put("/:userId", checkAuth, UserController.updateUser);

router.put("",UserController.changepass);

module.exports = router;
