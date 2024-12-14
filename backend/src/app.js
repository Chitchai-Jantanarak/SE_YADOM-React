import express from 'express';
import cors from 'cors';
import appRoutes from './routes/appRoutes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json()); // Parse incoming JSON requests
app.use('/api/products', appRoutes); // Mount the product routes

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
