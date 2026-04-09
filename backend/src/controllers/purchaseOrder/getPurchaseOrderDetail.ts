import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllPurchaseOrderDetails = async (req: Request, res: Response) => {
    try {
        const details = await prisma.purchaseOrderDetail.findMany({
            include: {
                purchaseOrder: true,
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
            message: 'Error fetching purchase order details',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getPurchaseOrderDetailById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Detail ID is required',
            });
            return;
        }

        const detail = await prisma.purchaseOrderDetail.findMany({
            where: { id },
            include: {
                purchaseOrder: true,
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
            message: 'Error fetching purchase order detail',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getPurchaseOrderDetailsByOrderId = async (req: Request, res: Response) => {
    try {
        const purchaseOrderId = Array.isArray(req.params.purchaseOrderId) ? req.params.purchaseOrderId[0] : req.params.purchaseOrderId;

        if (!purchaseOrderId) {
            res.status(400).json({
                success: false,
                message: 'Purchase Order ID is required',
            });
            return;
        }

        const details = await prisma.purchaseOrderDetail.findMany({
            where: { purchaseOrderId },
            include: {
                purchaseOrder: true,
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
            message: 'Error fetching purchase order details',
            error: error instanceof Error ? error.message : error,
        });
    }
};
