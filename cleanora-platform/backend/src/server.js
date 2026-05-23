import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Cleanora API running on port ${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the other process or set a different PORT in .env.`);
      process.exit(1);
    }

    console.error('Failed to start Cleanora API:', error.message);
    process.exit(1);
  });
}

startServer().catch((error) => {
  console.error('Failed to start Cleanora API:', error.message);
  process.exit(1);
});
