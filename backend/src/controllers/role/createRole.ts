import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewRole = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Role name is required',
            });
            return;
        }

        const role = await prisma.role.create({
            data: { name },
        });

        res.status(201).json({
            success: true,
            message: 'Role created successfully',
            data: role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating role',
            error: error instanceof Error ? error.message : error,
        });
    }
};