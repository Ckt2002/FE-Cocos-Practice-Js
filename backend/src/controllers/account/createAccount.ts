import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewAccount = async (req: Request, res: Response) => {
    try {
        const { username, password, staffId } = req.body;

        if (!username) {
            res.status(400).json({
                success: false,
                message: 'Account name is required',
            });
            return;
        }

        const account = await prisma.account.create({
            data: { username, password, staffId },
        });

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: account,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating account',
            error: error instanceof Error ? error.message : error,
        });
    }
};