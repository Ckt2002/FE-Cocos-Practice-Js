import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';
import { createNewPurchaseDetailFunc } from './createPurchaseOrderDetail.js';

export const createNewPurchaseOrder = async (req: Request, res: Response) => {
    try {
        const { managerId, providerId, purchaseOrderDetails } = req.body;
        if (!managerId || !providerId) {
            console.log("Err");
            res.status(400).json({
                success: false,
                message: 'Manager ID and Provider ID are required',
            });
            return;
        }

        const purchaseOrder = await prisma.purchaseOrder.create({
            data: {
                managerId,
                providerId,
            },
            include: {
                manager: true,
                provider: true,
            },
        });

        for (let detail of purchaseOrderDetails) {
            const detailResponse = await createNewPurchaseDetailFunc(purchaseOrder.id, detail.productId, detail.quantity);
            if (!detailResponse.success) {
                res.status(400).json({
                    success: false,
                    message: "Error creating purchase detail."
                });
                return;
            }
        }

        res.status(201).json({
            success: true,
            message: 'Purchase order created successfully',
            data: purchaseOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating purchase order',
            error: error instanceof Error ? error.message : error,
        });
    }
};
