import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updateGoodsReceipt = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Goods Receipt ID is required',
            });
            return;
        }

        const { totalPrice, staffId, providerId } = req.body;

        const receipt = await prisma.goodsReceipt.update({
            where: { id },
            data: {
                ...(totalPrice && { totalPrice }),
                ...(staffId && { staffId }),
                ...(providerId && { providerId }),
            },
            include: {
                staff: true,
                provider: true,
            },
        });

        res.json({
            success: true,
            message: 'Goods receipt updated successfully',
            data: receipt,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to update not found')) {
            res.status(404).json({
                success: false,
                message: 'Goods receipt not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating goods receipt',
            error: error instanceof Error ? error.message : error,
        });
    }
};
