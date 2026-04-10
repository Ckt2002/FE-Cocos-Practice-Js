import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const loginAccount = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({
                success: false,
                message: 'Username and password are required.',
            });
            return;
        }

        const account = await prisma.account.findUnique({
            where: { username },
            include: {
                staff: {
                    select: {
                        fullName: true,
                        role: true
                    }
                }
            }
        });

        if (!account || account.password !== password) {
            res.status(401).json({
                success: false,
                message: 'Invalid username or password.',
            });
            return;
        }

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                username: account.username,
                role: account.staff?.role?.name,
                fullname: account.staff?.fullName
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};