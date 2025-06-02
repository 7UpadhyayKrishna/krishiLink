import express, { Request, Response } from 'express';
import { Stock } from '../models/Stock.js';

const router = express.Router();

// Get all stock items
router.get('/', async (req: Request, res: Response) => {
  try {
    const stock = await Stock.find();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stock', error });
  }
});

// Add new stock item
router.post('/', async (req: Request, res: Response) => {
  try {
    const newItem = new Stock(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error adding stock item', error });
  }
});

// Update stock item
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedItem = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating stock item', error });
  }
});

// Delete stock item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedItem = await Stock.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }
    res.json({ message: 'Stock item deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting stock item', error });
  }
});

export default router; 