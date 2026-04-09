import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllCustomerOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.customerOrder.findMany({
            include: {
                customer: true,
                staff: true,
                customerOrderDetails: {
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
            message: 'Error fetching customer orders',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getCustomerOrderById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Customer Order ID is required',
            });
            return;
        }

        const order = await prisma.customerOrder.findMany({
            where: { id },
            include: {
                customer: true,
                staff: true,
                customerOrderDetails: {
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
            message: 'Error fetching customer order',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getCustomerOrderByCustomerId = async (req: Request, res: Response) => {
    try {
        const customerId = Array.isArray(req.params.customerId) ? req.params.customerId[0] : req.params.customerId;

        if (!customerId) {
            res.status(400).json({
                success: false,
                message: 'Customer ID is required',
            });
            return;
        }

        const orders = await prisma.customerOrder.findMany({
            where: { customerId },
            include: {
                customer: true,
                staff: true,
                customerOrderDetails: {
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
            message: 'Error fetching customer orders',
            error: error instanceof Error ? error.message : error,
        });
    }
};
