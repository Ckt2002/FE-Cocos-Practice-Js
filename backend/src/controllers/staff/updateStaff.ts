import type { Request, Response } from 'express';
import prisma from '../../db/prisma.js';

export const updateStaff = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Staff ID is required',
            });
            return;
        }

        const { staffID, fullName, age, gender, address, phoneNumber, roleId, isWorking } = req.body;

        const staff = await prisma.staff.update({
            where: { id },
            data: {
                ...(staffID && { staffID }),
                ...(fullName && { fullName }),
                ...(age && { age }),
                ...(gender && { gender }),
                ...(address && { address }),
                ...(phoneNumber && { phoneNumber }),
                ...(roleId && { roleId }),
                ...(isWorking !== undefined && { isWorking }),
            },
            include: { role: true },
        });

        res.json({
            success: true,
            message: 'Staff updated successfully',
            data: staff,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to update not found')) {
            res.status(404).json({
                success: false,
                message: 'Staff not found',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Error updating staff',
            error: error instanceof Error ? error.message : error,
        });
    }
};
