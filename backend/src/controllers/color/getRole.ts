import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllColors = async (req: Request, res: Response) => {
    try {
        const colors = await prisma.color.findMany();

        res.json({
            success: true,
            data: colors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching colors',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getColorById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Color Id is required.',
            });
            return;
        }

        const colors = await prisma.color.findMany({
            where: { id }
        });

        res.json({
            success: true,
            data: colors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching colors',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getColorByName = async (req: Request, res: Response) => {
    try {
        const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Color name is required.',
            });
            return;
        }

        const colors = await prisma.color.findMany({
            where: { name }
        });

        res.json({
            success: true,
            data: colors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching colors',
            error: error instanceof Error ? error.message : error,
        });
    }
};