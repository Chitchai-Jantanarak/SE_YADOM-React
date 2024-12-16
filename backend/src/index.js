import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appRoutes from './routes/appRoutes.js';

// env var
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true 
}

app.use(cors(corsOptions));

 // Parse incoming JSON requests
app.use(express.json());

// Mount the product routes
app.use('/api/products', appRoutes); 

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
