import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://krishna:Ram%40161003@auth.sptmlnq.mongodb.net/?retryWrites=true&w=majority&appName=auth';

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected to Atlas');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

testConnection(); 