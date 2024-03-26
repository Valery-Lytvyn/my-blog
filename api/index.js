const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const { MONGODB_URI, PORT } = process.env;

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(helmet());

// Database connection
mongoose.connect(MONGODB_URI);

// Routes
app.post("/register", require("./routes/register"));
app.post("/login", require("./routes/login"));
app.get("/profile", require("./routes/profile"));
app.post("/logout", require("./routes/logout"));
app.post("/post", require("./routes/post"));
app.get("/posts", require("./routes/posts"));
app.get("/post/:id", require("./routes/postById"));
app.put("/post", require("./routes/updatePost"));

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
