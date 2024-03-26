const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    if (isPasswordValid) {
      jwt.sign(
        { username, id: user._id },
        process.env.SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json({ id: user._id, username });
        },
      );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = loginUser;
