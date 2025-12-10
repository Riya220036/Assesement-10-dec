const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// GET /api/subscribers
router.get('/', async (req, res) => {
  try {
    const subs = await Subscriber.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/subscribers
router.post('/', async (req, res) => {
  try {
    const s = new Subscriber(req.body);
    const saved = await s.save();
    res.status(201).json(saved);
  } catch (err) {
    // handle duplicate key error for unique email
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/subscribers/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Subscriber.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Subscriber not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
