const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { formData } = req.body;
    const saltRounds = parseInt(process.env.SALT, 10);
    const hashedPassword = bcrypt.hashSync(formData.password, saltRounds);
    const user = await User.create({
      username: formData.username,
      password: hashedPassword,
    });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = registerUser;
