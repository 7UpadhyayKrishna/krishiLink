import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import stockRoutes from './routes/stock.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://krishna:Ram%40161003@auth.sptmlnq.mongodb.net/?retryWrites=true&w=majority&appName=auth';

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected to Atlas');

    // Routes
    app.use('/api/stock', stockRoutes);
    app.use('/api/auth', authRoutes);

    app.get('/', (req: express.Request, res: express.Response) => {
      res.json({ message: 'API Running' });
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

startServer(); 