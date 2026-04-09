import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllCustomerOrderDetails = async (req: Request, res: Response) => {
    try {
        const details = await prisma.customerOrderDetail.findMany({
            include: {
                customerOrder: true,
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
            message: 'Error fetching customer order details',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getCustomerOrderDetailById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Detail ID is required',
            });
            return;
        }

        const detail = await prisma.customerOrderDetail.findMany({
            where: { id },
            include: {
                customerOrder: true,
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
            message: 'Error fetching customer order detail',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getCustomerOrderDetailsByOrderId = async (req: Request, res: Response) => {
    try {
        const customerOrderId = Array.isArray(req.params.customerOrderId) ? req.params.customerOrderId[0] : req.params.customerOrderId;

        if (!customerOrderId) {
            res.status(400).json({
                success: false,
                message: 'Customer Order ID is required',
            });
            return;
        }

        const details = await prisma.customerOrderDetail.findMany({
            where: { customerOrderId },
            include: {
                customerOrder: true,
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
            message: 'Error fetching customer order details',
            error: error instanceof Error ? error.message : error,
        });
    }
};
