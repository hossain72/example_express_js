const Post = require("../model/post.model");

exports.createPost = async (request, respose) => {
  const newPost = await Post.create(request.body);
  respose.status(201).json(newPost);
};

exports.getAllPost = async (req, res)=>{
    const allPost = await Post.find();
    res.status(200).json(allPost);
}
