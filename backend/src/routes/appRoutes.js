// routes/productRoutes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Add authentication to protected routes
router.post('/secure-endpoint', authenticateToken, (req, res) => {
  res.json({ message: "This is secure data." });
});

export default router;
