import express from "express";
import { getAccountByStaffId, getAccountByUsername, getAllAccounts } from "../controllers/account/getAccount.js";
import { createNewAccount } from "../controllers/account/createAccount.js";
import { loginAccount } from "../controllers/account/loginAccount.js";

const router = express.Router();

router.get('/account', getAllAccounts);
router.get('/account/id', getAccountByStaffId);
router.get('/account/username', getAccountByUsername);

router.post('/account', createNewAccount);
router.post('/login', loginAccount);

export default router;