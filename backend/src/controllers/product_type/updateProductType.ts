import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updateProductType = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'product type ID is required',
            });
            return;
        }

        const { name } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Product type name is required',
            });
            return;
        }

        const productType = await prisma.productType.update({
            where: { id },
            data: { name }
        });

        res.json({
            success: true,
            message: 'Product type updated successfully',
            data: productType,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete not found')) {
            res.status(404).json({
                success: false,
                message: 'Product type not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating product type',
            error: error instanceof Error ? error.message : error,
        });
    }
};