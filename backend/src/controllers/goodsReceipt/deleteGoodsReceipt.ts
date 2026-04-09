import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const deleteGoodsReceipt = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Goods Receipt ID is required',
            });
            return;
        }

        const receipt = await prisma.goodsReceipt.delete({
            where: { id },
        });

        res.json({
            success: true,
            message: 'Goods receipt deleted successfully',
            data: receipt,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete not found')) {
            res.status(404).json({
                success: false,
                message: 'Goods receipt not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting goods receipt',
            error: error instanceof Error ? error.message : error,
        });
    }
};
