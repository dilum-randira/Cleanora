import mongoose from 'mongoose';

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('MONGO_URI is not set. Skipping MongoDB connection for now.');
    return;
  }

  const timeoutMs = 10000;
  const connection = mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: timeoutMs,
    connectTimeoutMS: timeoutMs,
  });

  await Promise.race([
    connection,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('MongoDB connection timed out after 10 seconds'));
      }, timeoutMs);
    }),
  ]);

  console.log('MongoDB connected');
}

export default connectDB;
