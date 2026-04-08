import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updateSize = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Size ID is required',
            });
            return;
        }

        const { name } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Size name is required',
            });
            return;
        }

        const size = await prisma.size.update({
            where: { id },
            data: { name }
        });

        res.json({
            success: true,
            message: 'Size deleted successfully',
            data: size,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete not found')) {
            res.status(404).json({
                success: false,
                message: 'Size not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating size',
            error: error instanceof Error ? error.message : error,
        });
    }
};