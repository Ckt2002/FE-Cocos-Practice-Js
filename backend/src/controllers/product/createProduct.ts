import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewProduct = async (req: Request, res: Response) => {
    try {
        const {
            name,
            price,
            quantity,
            color,
            type,
            brand,
            size
        } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Product name is required',
            });
            return;
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                quantity,
                color,
                type,
                brand,
                size
            },
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error instanceof Error ? error.message : error,
        });
    }
};