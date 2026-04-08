import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewSize = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Size name is required',
            });
            return;
        }

        const size = await prisma.size.create({
            data: { name },
        });

        res.status(201).json({
            success: true,
            message: 'Size created successfully',
            data: size,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating size',
            error: error instanceof Error ? error.message : error,
        });
    }
};