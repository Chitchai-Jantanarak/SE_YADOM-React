import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import appRoute from './routes/app.route.js';
import authRoute from './routes/auth.route.js';

// env var
config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  // Required for cookies
}

app.use(cors(corsOptions));

 // Parse incoming JSON requests
app.use(json());

// Mount the product routes
app.use('/api/auth', authRoute); 
app.use('/api/app', appRoute); 

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Someting went wrong' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});