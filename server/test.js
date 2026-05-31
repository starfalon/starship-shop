const mongoose = require("mongoose");
require("dotenv").config();

console.log("Trying to connect to:", process.env.CONNECTION_STRING);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Connection failed:", err.message);
    process.exit(1);
  });
