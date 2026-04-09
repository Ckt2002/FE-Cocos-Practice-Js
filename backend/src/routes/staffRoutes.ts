import express from 'express';
import { getAllStaff, getStaffById, getStaffByName } from '../controllers/staff/getStaff.js';
import { createNewStaff } from '../controllers/staff/createStaff.js';
import { deleteStaff } from '../controllers/staff/deleteStaff.js';
import { updateStaff } from '../controllers/staff/updateStaff.js';

const router = express.Router();

router.get('/staff', getAllStaff);
router.get('/staff/id/:id', getStaffById);
router.get('/staff/name/:name', getStaffByName);

router.post('/staff', createNewStaff);

router.put('/staff/:id', updateStaff);

router.delete('/staff/:id', deleteStaff);

export default router;
