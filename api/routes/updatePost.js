const fs = require("fs");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const updatePost = async (req, res) => {
  uploadMiddleware.single("file")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ error: "File upload failed" });
    }

    try {
      let newPath = null;
      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
      }
      const { token } = req.cookies;
      jwt.verify(token, process.env.SECRET, {}, async (error, info) => {
        if (error) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);

        if (!postDoc) {
          return res.status(404).json({ error: "Post not found" });
        }

        if (postDoc.author.toString() !== info.id.toString()) {
          return res
            .status(403)
            .json({ error: "You are not the author of this post" });
        }

        await postDoc.updateOne({
          title,
          summary,
          content,
          cover: newPath ? newPath : postDoc.cover,
        });
        res.json(postDoc);
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
};

module.exports = updatePost;
