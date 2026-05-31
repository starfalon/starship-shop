const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/productModel");
const connectDB = require("./config/dbConnection");

const products = [
  {
    name: "X-Wing",
    category: "Starfighters",
    price: 149999,
    length: "12.5m",
    crew: "1 pilot + R2",
    image: "",
    description:
      "The T-65 X-wing starfighter is the primary fighter of the Rebel Alliance.",
  },
  {
    name: "TIE Fighter",
    category: "Starfighters",
    price: 89999,
    length: "6.3m",
    crew: "1 pilot",
    image: "",
    description:
      "The TIE/ln space superiority starfighter is the standard Imperial fighter.",
  },
  {
    name: "A-Wing",
    category: "Starfighters",
    price: 175000,
    length: "9.6m",
    crew: "1 pilot",
    image: "",
    description:
      "The RZ-1 A-wing interceptor is one of the fastest ships in the galaxy.",
  },
  {
    name: "Millennium Falcon",
    category: "Freighters",
    price: 104000,
    length: "34.75m",
    crew: "6 crew",
    image: "",
    description:
      "The Millennium Falcon is a modified YT-1300 Corellian light freighter.",
  },
  {
    name: "Slave I",
    category: "Freighters",
    price: 98000,
    length: "21.5m",
    crew: "1 pilot",
    image: "",
    description:
      "Slave I is a modified Firespray-31-class patrol and attack craft.",
  },
  {
    name: "Star Destroyer",
    category: "Capital Ships",
    price: 899000,
    length: "1600m",
    crew: "37,000 crew",
    image: "",
    description:
      "The Imperial-class Star Destroyer is the backbone of the Imperial Navy.",
  },
  {
    name: "Mon Calamari Cruiser",
    category: "Capital Ships",
    price: 650000,
    length: "1200m",
    crew: "5,000 crew",
    image: "",
    description:
      "The MC80 Star Cruiser is the main capital ship of the Rebel Alliance.",
  },
  {
    name: "Lambda Shuttle",
    category: "Shuttles & Corvettes",
    price: 59999,
    length: "20m",
    crew: "6 crew",
    image: "",
    description:
      "The Lambda-class T-4a shuttle is used for personnel transport by the Empire.",
  },
  {
    name: "Tantive IV",
    category: "Shuttles & Corvettes",
    price: 240000,
    length: "150m",
    crew: "165 crew",
    image: "",
    description: "The Tantive IV is a CR90 corvette used by Princess Leia.",
  },
];

const seedDB = async () => {
  await connectDB();

  // Tar bort alla befintliga produkter innan vi lägger till nya
  await Product.deleteMany();
  console.log("Products deleted");

  // Lägger till alla produkter
  await Product.insertMany(products);
  console.log("Products seeded successfully!");

  process.exit();
};

seedDB();
