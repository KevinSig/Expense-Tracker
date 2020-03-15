const express = require("express");
const router = express.Router();

// our routes in our HTTP 

const {
  getTransactions,
  addTransactions,
  deleteTransactions
} = require("../controllers/transactions"); // deconstructing 

router
  .route("/") //main route
  .get(getTransactions) 
  .post(addTransactions);

router
.route("/:id") //takes in an ID to delete
.delete(deleteTransactions)

module.exports = router;
