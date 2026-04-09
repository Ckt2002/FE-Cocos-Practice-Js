import express from 'express';
import { getAllPurchaseOrders, getPurchaseOrderById, getPurchaseOrderByProviderId } from '../controllers/purchaseOrder/getPurchaseOrder.js';
import { createNewPurchaseOrder } from '../controllers/purchaseOrder/createPurchaseOrder.js';
import { deletePurchaseOrder } from '../controllers/purchaseOrder/deletePurchaseOrder.js';
import { updatePurchaseOrder } from '../controllers/purchaseOrder/updatePurchaseOrder.js';
import { getAllPurchaseOrderDetails, getPurchaseOrderDetailById, getPurchaseOrderDetailsByOrderId } from '../controllers/purchaseOrder/getPurchaseOrderDetail.js';
import { createNewPurchaseOrderDetail } from '../controllers/purchaseOrder/createPurchaseOrderDetail.js';
import { deletePurchaseOrderDetail } from '../controllers/purchaseOrder/deletePurchaseOrderDetail.js';
import { updatePurchaseOrderDetail } from '../controllers/purchaseOrder/updatePurchaseOrderDetail.js';

const router = express.Router();

// Purchase Order Routes
router.get('/purchaseOrder', getAllPurchaseOrders);
router.get('/purchaseOrder/id/:id', getPurchaseOrderById);
router.get('/purchaseOrder/providerId/:providerId', getPurchaseOrderByProviderId);

router.post('/purchaseOrder', createNewPurchaseOrder);

router.put('/purchaseOrder/:id', updatePurchaseOrder);

router.delete('/purchaseOrder/:id', deletePurchaseOrder);

// Purchase Order Detail Routes
router.get('/purchaseOrderDetail', getAllPurchaseOrderDetails);
router.get('/purchaseOrderDetail/id/:id', getPurchaseOrderDetailById);
router.get('/purchaseOrderDetail/purchaseOrderId/:purchaseOrderId', getPurchaseOrderDetailsByOrderId);

router.post('/purchaseOrderDetail', createNewPurchaseOrderDetail);

router.put('/purchaseOrderDetail/:id', updatePurchaseOrderDetail);

router.delete('/purchaseOrderDetail/:id', deletePurchaseOrderDetail);

export default router;
