import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewCustomerOrder = async (req: Request, res: Response) => {
    try {
        const { customerId, totalPrice, staffId, cancelReason } = req.body;

        if (!customerId || !totalPrice || !staffId) {
            res.status(400).json({
                success: false,
                message: 'Required fields are missing',
            });
            return;
        }

        const customerOrder = await prisma.customerOrder.create({
            data: {
                customerId,
                totalPrice,
                staffId,
                cancelReason: cancelReason || null,
            },
            include: {
                customer: true,
                staff: true,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Customer order created successfully',
            data: customerOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating customer order',
            error: error instanceof Error ? error.message : error,
        });
    }
};
