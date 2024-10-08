const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');

// Get all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get particular FAQ
router.get('/:id', async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id);
      if (!faq) {
        return res.status(404).json({ message: 'FAQ not found' });
      }
      res.json(faq);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Create a new FAQ
router.post('/', async (req, res) => {
  const faq = new FAQ({
    fruitName: req.body.fruitName,
    question: req.body.question,
    answer: req.body.answer
  });

  try {
    const newFAQ = await faq.save();
    res.status(201).json(newFAQ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an FAQ by ID
router.put('/:id', async (req, res) => {
  try {
    // Find FAQ by ID and update its details
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id,
      {
        fruitName: req.body.fruitName,
        question: req.body.question,
        answer: req.body.answer
      },
      { new: true }  // This option returns the updated document
    );
    
    if (!updatedFAQ) return res.status(404).send('FAQ not found');
    res.json(updatedFAQ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an FAQ by ID
router.delete('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).send('FAQ not found');
    res.status(200).send('FAQ deleted successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
