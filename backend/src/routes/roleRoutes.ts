import express from 'express';
import { getAllRoles, getRoleById, getRoleByName } from '../controllers/role/getRole.js';
import { createNewRole } from '../controllers/role/createRole.js';
import { updateRole } from '../controllers/role/updateRole.js';
import { deleteRole } from '../controllers/role/deleteRole.js';

const router = express.Router();

router.get('/role', getAllRoles);
router.get('/role/id/:id', getRoleById);
router.get('/role/name/:name', getRoleByName);

router.post('/role', createNewRole);

router.put('/role/:id', updateRole);

router.delete('/role/:id', deleteRole);

export default router;