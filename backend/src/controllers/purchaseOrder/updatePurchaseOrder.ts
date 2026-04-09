import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updatePurchaseOrder = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Purchase Order ID is required',
            });
            return;
        }

        const { managerId, providerId } = req.body;

        const order = await prisma.purchaseOrder.update({
            where: { id },
            data: {
                ...(managerId && { managerId }),
                ...(providerId && { providerId }),
            },
            include: {
                manager: true,
                provider: true,
            },
        });

        res.json({
            success: true,
            message: 'Purchase order updated successfully',
            data: order,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to update not found')) {
            res.status(404).json({
                success: false,
                message: 'Purchase order not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating purchase order',
            error: error instanceof Error ? error.message : error,
        });
    }
};
