import express from 'express';
import { getAllSizes, getSizeById, getSizeByName } from '../controllers/size/getSize.js';
import { createNewSize } from '../controllers/size/createSize.js';
import { updateSize } from '../controllers/size/updateSize.js';
import { deleteSize } from '../controllers/size/deleteSize.js';

const router = express.Router();

router.get('/size', getAllSizes);
router.get('/size/id/:id', getSizeById);
router.get('/size/name/:name', getSizeByName);

router.post('/size', createNewSize);

router.put('/size/:id', updateSize);

router.delete('/size/:id', deleteSize);

export default router;