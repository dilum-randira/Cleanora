import cors from 'cors';
import express from 'express';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
