import express from 'express';
import { getAllCustomerOrders, getCustomerOrderById, getCustomerOrderByCustomerId } from '../controllers/order/getCustomerOrder.js';
import { createNewCustomerOrder } from '../controllers/order/createCustomerOrder.js';
import { deleteCustomerOrder } from '../controllers/order/deleteCustomerOrder.js';
import { updateCustomerOrder } from '../controllers/order/updateCustomerOrder.js';
import { getAllCustomerOrderDetails, getCustomerOrderDetailById, getCustomerOrderDetailsByOrderId } from '../controllers/order/getCustomerOrderDetail.js';
import { createNewCustomerOrderDetail } from '../controllers/order/createCustomerOrderDetail.js';
import { deleteCustomerOrderDetail } from '../controllers/order/deleteCustomerOrderDetail.js';
import { updateCustomerOrderDetail } from '../controllers/order/updateCustomerOrderDetail.js';

const router = express.Router();

// Customer Order Routes
router.get('/customerOrder', getAllCustomerOrders);
router.get('/customerOrder/id/:id', getCustomerOrderById);
router.get('/customerOrder/customerId/:customerId', getCustomerOrderByCustomerId);

router.post('/customerOrder', createNewCustomerOrder);

router.put('/customerOrder/:id', updateCustomerOrder);

router.delete('/customerOrder/:id', deleteCustomerOrder);

// Customer Order Detail Routes
router.get('/customerOrderDetail', getAllCustomerOrderDetails);
router.get('/customerOrderDetail/id/:id', getCustomerOrderDetailById);
router.get('/customerOrderDetail/customerOrderId/:customerOrderId', getCustomerOrderDetailsByOrderId);

router.post('/customerOrderDetail', createNewCustomerOrderDetail);

router.put('/customerOrderDetail/:id', updateCustomerOrderDetail);

router.delete('/customerOrderDetail/:id', deleteCustomerOrderDetail);

export default router;
