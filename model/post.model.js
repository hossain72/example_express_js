const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
