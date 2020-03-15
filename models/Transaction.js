const mongoose = require("mongoose");

// how our db will accept data
const TransactionSchema = new mongoose.Schema({
  
  text: {
    type: String,
    trim: true,
    required: [true, "please add some text"]
  },
  amount: {
    type: Number,
    required: [true, "please add some numbers"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Transaction',TransactionSchema)

// when we make a request, it will only accept text and amount