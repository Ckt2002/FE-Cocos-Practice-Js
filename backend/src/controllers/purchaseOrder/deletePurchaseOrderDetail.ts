import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const deletePurchaseOrderDetail = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Detail ID is required',
            });
            return;
        }

        const detail = await prisma.purchaseOrderDetail.delete({
            where: { id },
        });

        res.json({
            success: true,
            message: 'Purchase order detail deleted successfully',
            data: detail,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete not found')) {
            res.status(404).json({
                success: false,
                message: 'Purchase order detail not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting purchase order detail',
            error: error instanceof Error ? error.message : error,
        });
    }
};
