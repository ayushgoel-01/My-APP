const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  fruitName: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

module.exports = mongoose.model('FAQ', faqSchema);
