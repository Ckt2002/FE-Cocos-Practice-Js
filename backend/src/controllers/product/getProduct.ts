import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                type: true,
                color: true,
                size: true
            }
        });

        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product Id is required.',
            });
            return;
        }

        const products = await prisma.product.findMany({
            where: { id }
        });

        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getProductByName = async (req: Request, res: Response) => {
    try {
        const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;
        if (!name) {
            res.status(400).json({
                success: false,
                message: 'product full name is required.',
            });
            return;
        }

        const products = await prisma.product.findMany({
            where: { name }
        });

        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error instanceof Error ? error.message : error,
        });
    }
};