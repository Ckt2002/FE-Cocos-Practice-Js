import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }

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

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                price,
                quantity,
                color,
                type,
                brand,
                size
            }
        });

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete not found')) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error instanceof Error ? error.message : error,
        });
    }
};