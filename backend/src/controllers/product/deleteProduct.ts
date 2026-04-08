import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }

        const product = await prisma.product.delete({
            where: { id },
        });

        res.json({
            success: true,
            message: 'Product deleted successfully',
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
            message: 'Error deleting product',
            error: error instanceof Error ? error.message : error,
        });
    }
};