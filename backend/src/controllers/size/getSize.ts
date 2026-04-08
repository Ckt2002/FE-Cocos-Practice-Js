import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllSizes = async (req: Request, res: Response) => {
    try {
        const sizes = await prisma.size.findMany();

        res.json({
            success: true,
            data: sizes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching sizes',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getSizeById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Size Id is required.',
            });
            return;
        }

        const sizes = await prisma.size.findMany({
            where: { id }
        });

        res.json({
            success: true,
            data: sizes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching sizes',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getSizeByName = async (req: Request, res: Response) => {
    try {
        const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Size name is required.',
            });
            return;
        }

        const sizes = await prisma.size.findMany({
            where: { name }
        });

        res.json({
            success: true,
            data: sizes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching sizes',
            error: error instanceof Error ? error.message : error,
        });
    }
};