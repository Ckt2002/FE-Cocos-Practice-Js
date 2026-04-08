import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllBrands = async (req: Request, res: Response) => {
    try {
        const brands = await prisma.brand.findMany();

        res.json({
            success: true,
            data: brands,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching brands',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Brand Id is required.',
            });
            return;
        }

        const brands = await prisma.brand.findMany({
            where: { id }
        });

        res.json({
            success: true,
            data: brands,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching brands',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getBrandByName = async (req: Request, res: Response) => {
    try {
        const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Brand name is required.',
            });
            return;
        }

        const brands = await prisma.brand.findMany({
            where: { name }
        });

        res.json({
            success: true,
            data: brands,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching brands',
            error: error instanceof Error ? error.message : error,
        });
    }
};