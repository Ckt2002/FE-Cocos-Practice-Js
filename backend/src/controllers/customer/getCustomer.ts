import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany();

        res.json({
            success: true,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching customers',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Customer Id is required.',
            });
            return;
        }

        const customers = await prisma.customer.findMany({
            where: { id }
        });

        res.json({
            success: true,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching customers',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getCustomerByName = async (req: Request, res: Response) => {
    try {
        const fullName = Array.isArray(req.params.fullName) ? req.params.fullName[0] : req.params.fullName;
        if (!fullName) {
            res.status(400).json({
                success: false,
                message: 'Customer full name is required.',
            });
            return;
        }

        const customers = await prisma.customer.findMany({
            where: { fullName }
        });

        res.json({
            success: true,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching customers',
            error: error instanceof Error ? error.message : error,
        });
    }
};