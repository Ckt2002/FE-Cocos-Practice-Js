import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await prisma.role.findMany();

        res.json({
            success: true,
            data: roles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching roles',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getRoleById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Role Id is required.',
            });
            return;
        }

        const roles = await prisma.role.findMany({
            where: { id }
        });

        res.json({
            success: true,
            data: roles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching roles',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getRoleByName = async (req: Request, res: Response) => {
    try {
        const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Role name is required.',
            });
            return;
        }

        const roles = await prisma.role.findMany({
            where: { name }
        });

        res.json({
            success: true,
            data: roles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching roles',
            error: error instanceof Error ? error.message : error,
        });
    }
};