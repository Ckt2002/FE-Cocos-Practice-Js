import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';
import { updateProductQuantityFunc } from '../product/getProduct.js';

export const createNewCustomerOrderDetail = async (req: Request, res: Response) => {
    try {
        const { customerOrderId, productId, quantity, price } = req.body;

        if (!customerOrderId || !productId || !quantity || !price) {
            res.status(400).json({
                success: false,
                message: 'All required fields must be provided',
            });
            return;
        }

        const detail = await prisma.customerOrderDetail.create({
            data: {
                customerOrderId,
                productId,
                quantity,
                price,
            },
            include: {
                customerOrder: true,
                product: true,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Customer order detail created successfully',
            data: detail,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating customer order detail',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const addNewCustomerOrderDetailFunc = async (customerOrderId: string, productId: string, quantity: number, price: number) => {
    try {
        const productQuantity = await updateProductQuantityFunc(productId, quantity);

        if (!productQuantity.success) {
            return {
                success: false,
                message: 'Error updating product quantity.'
            };
        }

        const detail = await prisma.customerOrderDetail.create({
            data: {
                customerOrderId,
                productId,
                quantity,
                price,
            },
            include: {
                customerOrder: true,
                product: true,
            },
        });

        return {
            success: true,
            message: 'Customer order detail created successfully',
            data: detail,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error creating customer order detail',
            error: error instanceof Error ? error.message : error,
        };
    }
};