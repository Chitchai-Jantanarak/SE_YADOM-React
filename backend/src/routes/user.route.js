import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

// Get user profile
router.get('/me', authenticateToken(), async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                tel: true,
                address: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                result: false,
                status: 'error',
                msg: 'User not found',
            });
        }

        return res.status(200).json({
            result: true,
            status: 'success',
            data: user,
        });
    }
    catch (err) {
        return res.status(500).json({
            result: false,
            status: 'error',
            msg: err.message,
        });
    }
});