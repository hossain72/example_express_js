const express = require("express");
const router = express.Router();

const postController = require("../controller/post.controller");
const userController = require("../controller/user.controller");

router.post("/", userController.protect, postController.createPost);

router.get("/", postController.getAllPost);

router.get("/:id", postController.getSinglePost);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

module.exports = router;
