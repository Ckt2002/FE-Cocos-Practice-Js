import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewPurchaseOrderDetail = async (req: Request, res: Response) => {
    try {
        const { purchaseOrderId, productId, quantity } = req.body;

        if (!purchaseOrderId || !productId || !quantity) {
            res.status(400).json({
                success: false,
                message: 'All required fields must be provided',
            });
            return;
        }

        const detail = await prisma.purchaseOrderDetail.create({
            data: {
                purchaseOrderId,
                productId,
                quantity,
            },
            include: {
                purchaseOrder: true,
                product: true,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Purchase order detail created successfully',
            data: detail,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating purchase order detail',
            error: error instanceof Error ? error.message : error,
        });
    }
};
