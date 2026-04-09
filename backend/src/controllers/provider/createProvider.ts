import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewProvider = async (req: Request, res: Response) => {
    try {
        const { name, address, phoneNumber } = req.body;

        if (!name || !address || !phoneNumber) {
            res.status(400).json({
                success: false,
                message: 'All required fields must be provided',
            });
            return;
        }

        const provider = await prisma.provider.create({
            data: { name, address, phoneNumber },
        });

        res.status(201).json({
            success: true,
            message: 'Provider created successfully',
            data: provider,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating provider',
            error: error instanceof Error ? error.message : error,
        });
    }
};
