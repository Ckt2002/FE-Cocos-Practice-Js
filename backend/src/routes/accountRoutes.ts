import express from "express";
import { getAccountByStaffId, getAccountByUsername, getAllAccounts } from "../controllers/account/getAccount.js";
import { createNewAccount } from "../controllers/account/createAccount.js";

const router = express.Router();

router.get('/account', getAllAccounts);
router.get('/account/id', getAccountByStaffId);
router.get('/account/username', getAccountByUsername);

router.post('/account', createNewAccount);

export default router;