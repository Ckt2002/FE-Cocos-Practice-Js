import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';
import { createGoodsReceiptDetailFunc } from './createGoodsReceiptDetail.js';

export const createNewGoodsReceipt = async (req: Request, res: Response) => {
    try {
        const { totalPrice, staffId, providerId, goodsReceiptDetails } = req.body;

        if (!totalPrice || !staffId || !providerId) {
            res.status(400).json({
                success: false,
                message: 'All required fields must be provided',
            });
            return;
        }

        const receipt = await prisma.goodsReceipt.create({
            data: {
                totalPrice,
                staffId,
                providerId,
            },
            include: {
                staff: true,
                provider: true,
            },
        });

        for (let detail of goodsReceiptDetails) {
            const receiptRes = await createGoodsReceiptDetailFunc(receipt.id, detail.productId, detail.quantity, detail.price);
            if (!receiptRes.success) {
                res.status(400).json({
                    success: false,
                    message: 'Error creating goods receipt'
                });
            }
        }

        res.status(201).json({
            success: true,
            message: 'Goods receipt created successfully',
            data: receipt,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating goods receipt',
            error: error instanceof Error ? error.message : error,
        });
    }
};
