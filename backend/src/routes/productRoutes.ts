import express from "express";
import { getAllProducts, getProductById, getProductByName } from "../controllers/product/getProduct.js";
import { createNewProduct } from "../controllers/product/createProduct.js";
import { updateProduct } from "../controllers/product/updateProduct.js";
import { deleteProduct } from "../controllers/product/deleteProduct.js";

const router = express.Router();

// Product Routes
router.get('/product', getAllProducts);
router.get('/product/id/:id', getProductById);
router.get('/product/name/:name', getProductByName);

router.post('/product', createNewProduct);

router.put('/product/:id', updateProduct);

router.delete('/product/:id', deleteProduct);

export default router;