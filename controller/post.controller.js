const Post = require("../model/post.model");

exports.createPost = async (request, respose) => {
  const newPost = await Post.create(request.body);
  respose.status(201).json(newPost);
};

exports.getAllPost = async (req, res) => {
  const allPost = await Post.find();
  res.status(200).json(allPost);
};

exports.getSinglePost = async (req, res) => {
  const singlePost = await Post.findById(req.params.id);
  res.status(200).json(singlePost);
};

exports.updatePost = async (req, res) => {
  const singlePostUpdate = await Post.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(singlePostUpdate);
};
