import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewGoodsReceiptDetail = async (req: Request, res: Response) => {
    try {
        const { goodsReceiptId, productId, quantity, price } = req.body;

        if (!goodsReceiptId || !productId || !quantity || !price) {
            res.status(400).json({
                success: false,
                message: 'All required fields must be provided',
            });
            return;
        }

        const detail = await prisma.goodsReceiptDetail.create({
            data: {
                goodsReceiptId,
                productId,
                quantity,
                price,
            },
            include: {
                goodsReceipt: true,
                product: true,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Goods receipt detail created successfully',
            data: detail,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating goods receipt detail',
            error: error instanceof Error ? error.message : error,
        });
    }
};
