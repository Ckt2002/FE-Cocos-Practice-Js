import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updateCustomerOrder = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Customer Order ID is required',
            });
            return;
        }

        const { customerId, totalPrice, staffId, cancelReason } = req.body;

        const order = await prisma.customerOrder.update({
            where: { id },
            data: {
                ...(customerId && { customerId }),
                ...(totalPrice && { totalPrice }),
                ...(staffId && { staffId }),
                ...(cancelReason !== undefined && { cancelReason }),
            },
            include: {
                customer: true,
                staff: true,
            },
        });

        res.json({
            success: true,
            message: 'Customer order updated successfully',
            data: order,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to update not found')) {
            res.status(404).json({
                success: false,
                message: 'Customer order not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating customer order',
            error: error instanceof Error ? error.message : error,
        });
    }
};
