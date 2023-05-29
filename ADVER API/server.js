const express = require("express");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongostat --uri mongodb+srv://kapilbhardwaj850:<PASSWORD>@cluster001.s60t45i.mongodb.net ",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create a schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  message: String,
});

// Create a model based on the schema
const FormData = mongoose.model("FormData", formDataSchema);

// Create an Express app
const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route to handle form submissions
app.post("/submit", (req, res) => {
  // Create a new instance of the FormData model
  const formData = new FormData({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    message: req.body.message,
  });

  // Save the form data to the database
  formData.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
