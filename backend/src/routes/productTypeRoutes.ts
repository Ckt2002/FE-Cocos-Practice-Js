import express from "express";
import { getAllProductTypes, getProductTypeById, getProductTypeByName } from "../controllers/product_type/getProductType.js";
import { createNewProductType } from "../controllers/product_type/createProductType.js";
import { updateProductType } from "../controllers/product_type/updateProductType.js";
import { deleteProductType } from "../controllers/product_type/deleteProductType.js";

const router = express.Router();

router.get('/type', getAllProductTypes);
router.get('/type/id/:id', getProductTypeById);
router.get('/type/name/:name', getProductTypeByName);

router.post('/type', createNewProductType);

router.put('/type/:id', updateProductType);

router.delete('/type/:id', deleteProductType);

export default router;