const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");

router.post("/", userController.signUp);

router.post("/signIn", userController.signIn)

router.get("/:id", userController.getSingleUser);

router.get("/", userController.getAllUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
