const jwt = require("jsonwebtoken");

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET, {}, (error, info) => {
      if (error) throw error;
      res.json(info);
    });
  }
};

module.exports = getProfile;
