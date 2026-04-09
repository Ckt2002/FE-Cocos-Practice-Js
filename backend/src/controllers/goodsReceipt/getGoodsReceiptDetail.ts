import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllGoodsReceiptDetails = async (req: Request, res: Response) => {
    try {
        const details = await prisma.goodsReceiptDetail.findMany({
            include: {
                goodsReceipt: true,
                product: true,
            },
        });

        res.json({
            success: true,
            data: details,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching goods receipt details',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getGoodsReceiptDetailById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Detail ID is required',
            });
            return;
        }

        const detail = await prisma.goodsReceiptDetail.findMany({
            where: { id },
            include: {
                goodsReceipt: true,
                product: true,
            },
        });

        res.json({
            success: true,
            data: detail,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching goods receipt detail',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getGoodsReceiptDetailsByReceiptId = async (req: Request, res: Response) => {
    try {
        const goodsReceiptId = Array.isArray(req.params.goodsReceiptId) ? req.params.goodsReceiptId[0] : req.params.goodsReceiptId;

        if (!goodsReceiptId) {
            res.status(400).json({
                success: false,
                message: 'Goods Receipt ID is required',
            });
            return;
        }

        const details = await prisma.goodsReceiptDetail.findMany({
            where: { goodsReceiptId },
            include: {
                goodsReceipt: true,
                product: true,
            },
        });

        res.json({
            success: true,
            data: details,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching goods receipt details',
            error: error instanceof Error ? error.message : error,
        });
    }
};
