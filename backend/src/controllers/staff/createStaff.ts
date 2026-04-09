import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const createNewStaff = async (req: Request, res: Response) => {
    try {
        const { staffID, fullName, age, gender, address, phoneNumber, roleId, isWorking } = req.body;

        if (!staffID || !fullName || !age || !gender || !address || !phoneNumber || !roleId) {
            res.status(400).json({
                success: false,
                message: 'All required fields must be provided',
            });
            return;
        }

        const staff = await prisma.staff.create({
            data: {
                staffID,
                fullName,
                age,
                gender,
                address,
                phoneNumber,
                roleId,
                isWorking: isWorking ?? true,
            },
            include: { role: true },
        });

        res.status(201).json({
            success: true,
            message: 'Staff created successfully',
            data: staff,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating staff',
            error: error instanceof Error ? error.message : error,
        });
    }
};
