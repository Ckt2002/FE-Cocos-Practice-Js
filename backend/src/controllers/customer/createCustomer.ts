import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewCustomer = async (req: Request, res: Response) => {
    try {
        const { fullName, phoneNumber } = req.body;

        if (!fullName) {
            res.status(400).json({
                success: false,
                message: 'Customer name is required',
            });
            return;
        }

        if (!phoneNumber) {
            res.status(400).json({
                success: false,
                message: 'Customer phone number is required',
            });
            return;
        }

        const customer = await prisma.customer.create({
            data: { fullName, phoneNumber },
        });

        res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            data: customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating customer',
            error: error instanceof Error ? error.message : error,
        });
    }
};