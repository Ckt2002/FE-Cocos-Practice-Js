import express from 'express';
import { getAllBrands, getBrandById, getBrandByName } from '../controllers/brand/getBrand.js';
import { createNewBrand } from '../controllers/brand/createBrand.js';
import { deleteBrand } from '../controllers/brand/deleteBrand.js';
import { updateBrand } from '../controllers/brand/updateBrand.js';

const router = express.Router();

router.get('/brand', getAllBrands);
router.get('/brand/id/:id', getBrandById);
router.get('/brand/name/:name', getBrandByName);

router.post('/brand', createNewBrand);

router.put('/brand/:id', updateBrand);

router.delete('/brand/:id', deleteBrand);

export default router;
