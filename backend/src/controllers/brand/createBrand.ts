import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewBrand = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Brand name is required',
            });
            return;
        }

        const brand = await prisma.brand.create({
            data: { name },
        });

        res.status(201).json({
            success: true,
            message: 'Brand created successfully',
            data: brand,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating brand',
            error: error instanceof Error ? error.message : error,
        });
    }
};