import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllProviders = async (req: Request, res: Response) => {
    try {
        const providers = await prisma.provider.findMany();

        res.json({
            success: true,
            data: providers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching providers',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getProviderById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Provider ID is required',
            });
            return;
        }

        const provider = await prisma.provider.findMany({
            where: { id },
        });

        res.json({
            success: true,
            data: provider,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching provider',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getProviderByName = async (req: Request, res: Response) => {
    try {
        const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Provider name is required',
            });
            return;
        }

        const provider = await prisma.provider.findMany({
            where: { name: { contains: name, mode: 'insensitive' } },
        });

        res.json({
            success: true,
            data: provider,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching provider',
            error: error instanceof Error ? error.message : error,
        });
    }
};
