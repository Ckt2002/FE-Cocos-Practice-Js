import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Brand ID is required',
            });
            return;
        }

        const brand = await prisma.brand.delete({
            where: { id },
        });

        res.json({
            success: true,
            message: 'Brand deleted successfully',
            data: brand,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete not found')) {
            res.status(404).json({
                success: false,
                message: 'Brand not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting brand',
            error: error instanceof Error ? error.message : error,
        });
    }
};