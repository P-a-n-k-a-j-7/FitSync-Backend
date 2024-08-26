const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connection = mongoose
  .createConnection(process.env.MONGO_URI)
  .on("open", () => {
    console.log("Connected to the database");
  })
  .on("error", (error) => {
    console.log(`Error connecting to the database: ${error}`);
  });

module.exports = connection;
