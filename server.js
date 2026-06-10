const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
// MongoDB Connection
mongoose.connect(
  "mongodb+srv://salem:StudyHub123@cluster0.byzfmpa.mongodb.net/studyhub?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// Home Route
app.get("/", (req, res) => {
  res.send("StudyHub AI Backend is running");
});

// Test Route
app.get("/test", (req, res) => {
  res.json({
    message: "Test route working"
  });
});

// Register Route
app.post("/register", async (req, res) => {
  try {
    console.log("REGISTER ROUTE HIT");

    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        name,
        email
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});