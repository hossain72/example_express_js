const express = require("express");
const router = express.Router();

const postController = require("../controller/post.controller");

router.post("/", postController.createPost);

router.get("/",postController.getAllPost);

module.exports = router;
