import express from 'express';
import { getAllProviders, getProviderById, getProviderByName } from '../controllers/provider/getProvider.js';
import { createNewProvider } from '../controllers/provider/createProvider.js';
import { deleteProvider } from '../controllers/provider/deleteProvider.js';
import { updateProvider } from '../controllers/provider/updateProvider.js';

const router = express.Router();

router.get('/provider', getAllProviders);
router.get('/provider/id/:id', getProviderById);
router.get('/provider/name/:name', getProviderByName);

router.post('/provider', createNewProvider);

router.put('/provider/:id', updateProvider);

router.delete('/provider/:id', deleteProvider);

export default router;
