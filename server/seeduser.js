const connectDB = require("./config/dbConnection");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const seedUser = async () => {
  await connectDB();

  // kollar om userredan finns
  const existing = await User.findOne({ username: "user" });
  if (existing) {
    console.log("Default user already exists");
    process.exit();
  }

  // hashar lösenordet innan det sparas i databasen
  const hashedPassword = await bcrypt.hash("password", 10);

  // skapar default-användaren
  await User.create({
    username: "user",
    email: "user@galacticfleet.com",
    password: hashedPassword,
  });

  console.log("Default user created — username: user, password: password");
  process.exit();
};

seedUser();
