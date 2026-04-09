import express from 'express';
import { getAllGoodsReceipts, getGoodsReceiptById, getGoodsReceiptByProviderId } from '../controllers/goodsReceipt/getGoodsReceipt.js';
import { createNewGoodsReceipt } from '../controllers/goodsReceipt/createGoodsReceipt.js';
import { deleteGoodsReceipt } from '../controllers/goodsReceipt/deleteGoodsReceipt.js';
import { updateGoodsReceipt } from '../controllers/goodsReceipt/updateGoodsReceipt.js';
import { getAllGoodsReceiptDetails, getGoodsReceiptDetailById, getGoodsReceiptDetailsByReceiptId } from '../controllers/goodsReceipt/getGoodsReceiptDetail.js';
import { createNewGoodsReceiptDetail } from '../controllers/goodsReceipt/createGoodsReceiptDetail.js';
import { deleteGoodsReceiptDetail } from '../controllers/goodsReceipt/deleteGoodsReceiptDetail.js';
import { updateGoodsReceiptDetail } from '../controllers/goodsReceipt/updateGoodsReceiptDetail.js';

const router = express.Router();

// Goods Receipt Routes
router.get('/goodsReceipt', getAllGoodsReceipts);
router.get('/goodsReceipt/id/:id', getGoodsReceiptById);
router.get('/goodsReceipt/providerId/:providerId', getGoodsReceiptByProviderId);

router.post('/goodsReceipt', createNewGoodsReceipt);

router.put('/goodsReceipt/:id', updateGoodsReceipt);

router.delete('/goodsReceipt/:id', deleteGoodsReceipt);

// Goods Receipt Detail Routes
router.get('/goodsReceiptDetail', getAllGoodsReceiptDetails);
router.get('/goodsReceiptDetail/id/:id', getGoodsReceiptDetailById);
router.get('/goodsReceiptDetail/goodsReceiptId/:goodsReceiptId', getGoodsReceiptDetailsByReceiptId);

router.post('/goodsReceiptDetail', createNewGoodsReceiptDetail);

router.put('/goodsReceiptDetail/:id', updateGoodsReceiptDetail);

router.delete('/goodsReceiptDetail/:id', deleteGoodsReceiptDetail);

export default router;
