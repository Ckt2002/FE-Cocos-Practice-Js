import express from 'express';
import { getAllCustomers, getCustomerById, getCustomerByName } from '../controllers/customer/getCustomer.js';
import { createNewCustomer } from '../controllers/customer/createCustomer.js';
import { updateCustomer } from '../controllers/customer/updateCustomer.js';
import { deleteCustomer } from '../controllers/customer/deleteCustomer.js';

const router = express.Router();

router.get('/customer', getAllCustomers);
router.get('/customer/id/:id', getCustomerById);
router.get('/customer/name/:fullName', getCustomerByName);
router.get('/customer/phone/:phoneNumber', getCustomerByName);

router.post('/customer', createNewCustomer);

router.put('/customer/:id', updateCustomer);

router.delete('/customer/:id', deleteCustomer);

export default router;