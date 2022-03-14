const Post = require("../model/post.model");

exports.createPost = async (request, respose) => {
  //request.query.date;
  console.log(request.query.date);
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

exports.deletePost = async (req, res) => {
  const deleteSinglePost = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Your Post is deleted",
  });
};


