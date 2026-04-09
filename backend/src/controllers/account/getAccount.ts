import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const getAllAccounts = async (req: Request, res: Response) => {
    try {
        const accounts = await prisma.account.findMany();

        res.json({
            success: true,
            data: accounts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching accounts',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getAccountByStaffId = async (req: Request, res: Response) => {
    try {
        const { staffId } = req.body;

        if (!staffId) {
            res.status(400).json({
                success: false,
                message: 'Account Id is required.',
            });
            return;
        }

        const account = await prisma.account.findFirst({
            where: { staffId }
        });

        res.json({
            success: true,
            data: account,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching accounts',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getAccountByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;

        if (!username) {
            res.status(400).json({
                success: false,
                message: 'Account name is required.',
            });
            return;
        }

        const account = await prisma.account.findFirst({
            where: { username }
        });

        res.json({
            success: true,
            data: account,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching accounts',
            error: error instanceof Error ? error.message : error,
        });
    }
};