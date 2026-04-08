import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewColor = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Color name is required',
            });
            return;
        }

        const color = await prisma.color.create({
            data: { name },
        });

        res.status(201).json({
            success: true,
            message: 'Color created successfully',
            data: color,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating color',
            error: error instanceof Error ? error.message : error,
        });
    }
};