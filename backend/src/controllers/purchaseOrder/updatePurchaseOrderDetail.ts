import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updatePurchaseOrderDetail = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Detail ID is required',
            });
            return;
        }

        const { purchaseOrderId, productId, quantity } = req.body;

        const detail = await prisma.purchaseOrderDetail.update({
            where: { id },
            data: {
                ...(purchaseOrderId && { purchaseOrderId }),
                ...(productId && { productId }),
                ...(quantity && { quantity }),
            },
            include: {
                purchaseOrder: true,
                product: true,
            },
        });

        res.json({
            success: true,
            message: 'Purchase order detail updated successfully',
            data: detail,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to update not found')) {
            res.status(404).json({
                success: false,
                message: 'Purchase order detail not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating purchase order detail',
            error: error instanceof Error ? error.message : error,
        });
    }
};
