import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllStaff = async (req: Request, res: Response) => {
    try {
        const staff = await prisma.staff.findMany({
            include: { role: true },
        });

        res.json({
            success: true,
            data: staff,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching staff',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getStaffById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Staff ID is required',
            });
            return;
        }

        const staff = await prisma.staff.findMany({
            where: { id },
            include: { role: true },
        });

        res.json({
            success: true,
            data: staff,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching staff',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getStaffByName = async (req: Request, res: Response) => {
    try {
        const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Staff name is required',
            });
            return;
        }

        const staff = await prisma.staff.findMany({
            where: { fullName: { contains: name, mode: 'insensitive' } },
            include: { role: true },
        });

        res.json({
            success: true,
            data: staff,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching staff',
            error: error instanceof Error ? error.message : error,
        });
    }
};
