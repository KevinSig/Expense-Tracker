const express = require("express"); //common js syntax
const dotenv = require("dotenv"); //zero-dependency module that loads environment variables from a .env file into process.env
const colors = require("colors"); // colors in the console
const morgan = require("morgan"); // HTTP request logger middleware for node.js
const connectDB = require('./config/db')

const app = express();
app.use(express.json()) // will allow to use body parser 

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");
app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000; //access global variables from the config
app.listen(
  PORT,
  console.log(
    `Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
