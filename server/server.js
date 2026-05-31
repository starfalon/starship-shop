const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const cors = require("cors");

connectDB();

const app = express();
const port = process.env.PORT || 5000;

// tillåter frontend (localhost:5173) att kommunicera med backenden
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

// Routes
app.use("/api/contacts", require("./routers/contactRoutes"));
app.use("/api/users", require("./routers/userRoutes"));
app.use("/api/products", require("./routers/productRoutes"));
app.use("/api/orders", require("./routers/orderRoutes"));

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
