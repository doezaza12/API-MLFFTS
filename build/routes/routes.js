"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AccountCtrl = require("../controller/account");
const LoginCtrl = require("../controller/login");
const router = express.Router();
exports.router = router;
// account
router.get('/getaccountlist', AccountCtrl.getAccountList);
router.post('/addAccount', AccountCtrl.insertAccount);
// login
router.get('/cb-line', LoginCtrl.callbackLine);
//# sourceMappingURL=routes.js.map