const express = require("express");
const app = express();
require("dotenv").config();

// local module
const db = require("./DB/db");
const listingRoutes = require("./Routes/listing.route");

// middlewares
app.use(express.json()); //
app.use(express.urlencoded({ extended: true }));
app.use("/api/listing", listingRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    error: true,
    message: message,
  });
});

// env
const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

// server
app.listen(PORT, () => {
  db(DB);
  console.log("Server is Running :)");
});
