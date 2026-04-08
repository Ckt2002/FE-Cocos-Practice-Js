import express from 'express';
import brandRoutes from './brandRoutes.js';
import roleRoutes from './roleRoutes.js';
import colorRoutes from './colorRoutes.js';
import sizeRoutes from './sizeRoutes.js';
import customerRoutes from './customerRoutes.js';

const router = express.Router();

router.use(brandRoutes);
router.use(roleRoutes);
router.use(colorRoutes);
router.use(sizeRoutes);
router.use(customerRoutes);

export default router;
