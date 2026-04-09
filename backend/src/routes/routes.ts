import express from 'express';
import brandRoutes from './brandRoutes.js';
import roleRoutes from './roleRoutes.js';
import colorRoutes from './colorRoutes.js';
import sizeRoutes from './sizeRoutes.js';
import customerRoutes from './customerRoutes.js';
import productRoutes from './productRoutes.js';
import productTypeRoutes from './productTypeRoutes.js';
import staffRoutes from './staffRoutes.js';
import providerRoutes from './providerRoutes.js';
import orderRoutes from './orderRoutes.js';
import purchaseOrderRoutes from './purchaseOrderRoutes.js';
import goodsReceiptRoutes from './goodsReceiptRoutes.js';
import accountRoutes from './accountRoutes.js';

const router = express.Router();

router.use(brandRoutes);
router.use(roleRoutes);
router.use(colorRoutes);
router.use(sizeRoutes);
router.use(customerRoutes);
router.use(productRoutes);
router.use(productTypeRoutes);
router.use(staffRoutes);
router.use(providerRoutes);
router.use(orderRoutes);
router.use(purchaseOrderRoutes);
router.use(goodsReceiptRoutes);
router.use(accountRoutes);

export default router;
