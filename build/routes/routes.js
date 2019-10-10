"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AccountCtrl = require("../controller/account");
const router = express.Router();
exports.router = router;
router.get('/getaccountlist', AccountCtrl.getAccountList);
//# sourceMappingURL=routes.js.map