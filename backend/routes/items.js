const express = require('express');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// @route   GET /api/items
// @desc    Get all items for the current user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    // Check if item exists
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if user owns the item
    if (item.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { text, completed } = req.body;
    
    // Validate input
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Text is required' });
    }
    
    const newItem = new Item({
      text,
      completed: completed || false,
      user: req.userId
    });
    
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { text, completed } = req.body;
    
    // Build item object
    const itemFields = {};
    if (text !== undefined) itemFields.text = text;
    if (completed !== undefined) itemFields.completed = completed;
    
    // Find item by id
    let item = await Item.findById(req.params.id);
    
    // Check if item exists
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if user owns the item
    if (item.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update item
    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );
    
    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // Find item by id
    const item = await Item.findById(req.params.id);
    
    // Check if item exists
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if user owns the item
    if (item.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Delete item
    await Item.findByIdAndRemove(req.params.id);
    
    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;