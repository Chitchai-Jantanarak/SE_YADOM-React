import express from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const prisma = new PrismaClient();
const router = express.Router();

// Register
router.post('/register', 
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('tel').notEmpty().withMessage('Tel is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    async (req, res) => {
        try {
            // Validate password confirmation
            if (req.body.password) {
                await body('confirmPassword')
                    .equals(req.body.password)
                    .withMessage('Passwords do not match')
                    .run(req);
            }

            // Check for validation errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ 
                    result : false,
                    status : 'warning',
                    msg    : result.array()
                });
            }

            const { name, email, tel, address, password } = req.body;

            // Check if email already exists
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ 
                    result : false,
                    status : 'warning',
                    msg    : 'Email already exists'
                });
            }

            // Hash password
            const hashedPassword = await argon2.hash(password);
            const prep = {
                data: {
                    name,
                    email,
                    tel,
                    address,
                    password: hashedPassword
                }   
            }

            // Create user
            const user = await prisma.user.create(prep);
            return res.status(200).json({ 
                result : true,
                status : 'success',
                msg    : 'User created successfully',
                user
            });
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({
                result: false,
                status: 'error',
                msg: 'Internal server error'
            });
        }
    }   
);

// Login
router.post('/login',
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        try {
            // Check for validation errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ 
                    result : false,
                    status : 'warning',
                    msg    : result.array()
                });
            }

            const { email, password } = req.body;
            const user = await prisma.user.findUnique({ where: { email } });
            // Check user exists
            if (!user) {
                return res.status(400).json({ 
                    result : false,
                    status : 'warning',
                    msg    : 'User not found'
                });
            }

            // Check password
            if (await argon2.verify(user.password, password)) {
                // Create token
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                return res.status(202).json({ 
                    result : true,
                    status : 'success',
                    msg    : 'Login successful',
                    token  : token // Include the token in the response
                });
            } 
            else {
                return res.status(401).json({
                    result : false,
                    status : 'warning',
                    msg    : 'Incorrect password'
                });
            }
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({
                result: false,
                status: 'error',
                msg: 'Internal server error'
            });
        }
    }
);

// Forgot Password
router.post('/forgot-password', 
    body('email').isEmail().withMessage('Email is required'),

    async (req, res) => {
        try {
            // Check for validation errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ 
                    result : false,
                    status : 'warning',
                    msg    : result.array()
                });
            }

            const { email } = req.body;
            const user = await prisma.user.findUnique({ where: { email } });

            // Check user exists
            if (!user) {
                return res.status(400).json({ 
                    result : false,
                    status : 'warning',
                    msg    : 'User not found'
                });
            }

            // Generate reset token
            const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Save token to user
            await prisma.user.update({
                where: { email },
                data: {
                    resetToken,
                    resetTokenExpiry: new Date(Date.now() + 3600000) // 1 hour
                }
            });

            // Send email with reset token
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset',
                text: `You requested a password reset. Please use the following link to reset your password: ${resetLink}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {   
                    return res.status(500).json({ 
                        result : false,
                        status : 'error',
                        msg    : 'Error sending email'
                    });
                } else {
                    return res.status(200).json({ 
                        result : true,
                        status : 'success',
                        msg    : 'Password reset email sent'
                    });
                }
            });
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({
                result: false,
                status: 'error',
                msg: 'Internal server error'
            });
        }
    }
);

// Reset Password
router.post('/reset-password', 
    body('token').notEmpty().withMessage('Token is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    async (req, res) => {
        try {
            // Check for validation errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ 
                    result : false,
                    status : 'warning',
                    msg    : result.array()
                });
            }

            const { token, password } = req.body;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prisma.user.findFirst({
                where: {
                    id: decoded.id,
                    resetToken: token,
                    resetTokenExpiry: {
                        gte: Date.now()
                    }
                }
            });

            // Check if token is valid
            if (!user) {
                return res.status(400).json({ 
                    result : false,
                    status : 'warning',
                    msg    : 'Invalid or expired token'
                });
            }

            // Hash new password
            const hashedPassword = await argon2.hash(password);

            // Update user's password and remove reset token
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                    resetToken: null,
                    resetTokenExpiry: null
                }
            });

            return res.status(200).json({ 
                result : true,
                status : 'success',
                msg    : 'Password reset successful'
            });
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({
                result: false,
                status: 'error',
                msg: 'Internal server error'
            });
        }
    }
);

export default router;