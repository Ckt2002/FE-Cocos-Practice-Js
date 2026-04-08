import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewProductType = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Product type name is required',
            });
            return;
        }

        const productType = await prisma.productType.create({
            data: { name },
        });

        res.status(201).json({
            success: true,
            message: 'Product type created successfully',
            data: productType,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product type',
            error: error instanceof Error ? error.message : error,
        });
    }
};