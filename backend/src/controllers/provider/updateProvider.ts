import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updateProvider = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Provider ID is required',
            });
            return;
        }

        const { name, address, phoneNumber } = req.body;

        const provider = await prisma.provider.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(address && { address }),
                ...(phoneNumber && { phoneNumber }),
            },
        });

        res.json({
            success: true,
            message: 'Provider updated successfully',
            data: provider,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to update not found')) {
            res.status(404).json({
                success: false,
                message: 'Provider not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating provider',
            error: error instanceof Error ? error.message : error,
        });
    }
};
