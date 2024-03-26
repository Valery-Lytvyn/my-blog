const fs = require("fs");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const createPost = async (req, res) => {
  uploadMiddleware.single("file")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ error: "File upload failed" });
    }
    try {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      const { token } = req.cookies;
      jwt.verify(token, process.env.SECRET, {}, async (error, info) => {
        if (error) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
          title,
          summary,
          content,
          cover: newPath,
          author: info.id,
        });
        res.json(postDoc);
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
};

module.exports = createPost;
