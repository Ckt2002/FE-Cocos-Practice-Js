import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllGoodsReceipts = async (req: Request, res: Response) => {
    try {
        const receipts = await prisma.goodsReceipt.findMany({
            include: {
                staff: true,
                provider: true,
                goodsReceiptDetails: {
                    include: { product: true },
                },
            },
        });

        res.json({
            success: true,
            data: receipts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching goods receipts',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getGoodsReceiptById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Goods Receipt ID is required',
            });
            return;
        }

        const receipt = await prisma.goodsReceipt.findMany({
            where: { id },
            include: {
                staff: true,
                provider: true,
                goodsReceiptDetails: {
                    include: { product: true },
                },
            },
        });

        res.json({
            success: true,
            data: receipt,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching goods receipt',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getGoodsReceiptByProviderId = async (req: Request, res: Response) => {
    try {
        const providerId = Array.isArray(req.params.providerId) ? req.params.providerId[0] : req.params.providerId;

        if (!providerId) {
            res.status(400).json({
                success: false,
                message: 'Provider ID is required',
            });
            return;
        }

        const receipts = await prisma.goodsReceipt.findMany({
            where: { providerId },
            include: {
                staff: true,
                provider: true,
                goodsReceiptDetails: {
                    include: { product: true },
                },
            },
        });

        res.json({
            success: true,
            data: receipts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching goods receipts',
            error: error instanceof Error ? error.message : error,
        });
    }
};
