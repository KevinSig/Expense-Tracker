const Transaction = require("../models/Transaction");

// @desc get all transactions
// @route GET /api/v1/transactions
// @access piblic

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
    
  } catch (err) {

    return res.status(500).json({
      success: false,
      error: "server erorr!!!!"
    });
  }
};

// @desc add transactions
// @route POST /api/v1/transactions
// @access piblic

exports.addTransactions = async (req, res, next) => {
  const { text, amount } = req.body; // data that is sent to create a transaction

  try {
    const transaction = await Transaction.create(req.body); // will only accept fields specified in the model

    return res.status(201).json({
      success: true,
      data: transaction
    });

  } catch (err) {

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);
      res.status(400).json({
        success: false,
        error: messages
      }); // client error

    } else {
      return res.status(500).json({
        success: false,
        error: "server erorr!?!!"
      });
    }
  }
};

//delete  transactions
// @route POST /api/v1/transactions/:id
//@access piblic

exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "no transaction found"
      });
    }
    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server erorr!?!!"
    });
  }
};
