import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllProductTypes = async (req: Request, res: Response) => {
    try {
        const productTypes = await prisma.productType.findMany();

        res.json({
            success: true,
            data: productTypes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product type',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getProductTypeById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product type Id is required.',
            });
            return;
        }

        const productTypes = await prisma.productType.findMany({
            where: { id }
        });

        res.json({
            success: true,
            data: productTypes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product type',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getProductTypeByName = async (req: Request, res: Response) => {
    try {
        const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;
        if (!name) {
            res.status(400).json({
                success: false,
                message: 'ProductType full name is required.',
            });
            return;
        }

        const productTypes = await prisma.productType.findMany({
            where: { name }
        });

        res.json({
            success: true,
            data: productTypes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product type',
            error: error instanceof Error ? error.message : error,
        });
    }
};