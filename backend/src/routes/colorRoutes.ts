import express from 'express';
import { getAllColors, getColorById, getColorByName } from '../controllers/color/getRole.js';
import { createNewColor } from '../controllers/color/createRole.js';
import { updateColor } from '../controllers/color/updateRole.js';
import { deleteColor } from '../controllers/color/deleteRole.js';

const router = express.Router();

router.get('/color', getAllColors);
router.get('/color/id/:id', getColorById);
router.get('/color/name/:name', getColorByName);

router.post('/color', createNewColor);

router.put('/color/:id', updateColor);

router.delete('/color/:id', deleteColor);

export default router;