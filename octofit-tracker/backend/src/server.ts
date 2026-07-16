import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';

const app = express();
const port = Number(process.env.PORT || 8000);
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());
app.use('/api', apiRoutes);

mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
