const logoutUser = (req, res) => {
  res.clearCookie("token").json({ message: "User logged out successfully" });
};

module.exports = logoutUser;
