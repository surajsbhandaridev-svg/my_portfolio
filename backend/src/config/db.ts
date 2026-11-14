import mongoose from 'mongoose';

export const connectDB = async (): Promise<boolean> => {
  const mongoURI = process.env.DATABASE_URL || process.env.MONGODB_URI;

  if (!mongoURI) {
    console.warn('⚠️  DATABASE_URL environment variable is not defined.');
    console.warn('⚠️  Running in memory/mock database fallback mode for local development.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    console.warn('⚠️  Switching to resilient memory store so the API remains functional.');
    return false;
  }
};
