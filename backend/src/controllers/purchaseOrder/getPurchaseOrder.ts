import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllPurchaseOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.purchaseOrder.findMany({
            include: {
                manager: true,
                provider: true,
                purchaseOrderDetails: {
                    include: { product: true },
                },
            },
        });

        res.json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching purchase orders',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getPurchaseOrderById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Purchase Order ID is required',
            });
            return;
        }

        const order = await prisma.purchaseOrder.findMany({
            where: { id },
            include: {
                manager: true,
                provider: true,
                purchaseOrderDetails: {
                    include: { product: true },
                },
            },
        });

        res.json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching purchase order',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getPurchaseOrderByProviderId = async (req: Request, res: Response) => {
    try {
        const providerId = Array.isArray(req.params.providerId) ? req.params.providerId[0] : req.params.providerId;

        if (!providerId) {
            res.status(400).json({
                success: false,
                message: 'Provider ID is required',
            });
            return;
        }

        const orders = await prisma.purchaseOrder.findMany({
            where: { providerId },
            include: {
                manager: true,
                provider: true,
                purchaseOrderDetails: {
                    include: { product: true },
                },
            },
        });

        res.json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching purchase orders',
            error: error instanceof Error ? error.message : error,
        });
    }
};
