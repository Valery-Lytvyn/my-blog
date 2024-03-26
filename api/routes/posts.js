const Post = require("../models/Post");

const getPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(20);
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = getPost;
