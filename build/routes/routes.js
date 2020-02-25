"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Middleware = require("../middleware/auth");
const AccountCtrl = require("../controller/account");
const UserInfoCtrl = require("../controller/user_info");
const LoginCtrl = require("../controller/login");
const RegisterCtrl = require("../controller/register");
const CheckpointCtrl = require("../controller/checkpoint");
const ChargesCtrl = require("../controller/charges");
const LpinfoCtrl = require("../controller/lp_info");
const TransactionCtrl = require("../controller/transaction");
const router = express.Router();
exports.router = router;
// account
router.get('/verify=:id', AccountCtrl.verifyAccount);
// router.get('/getaccountlist', AccountCtrl.getAccountList); // testing route
// router.post('/addAccount', AccountCtrl.insertAccount);
// userinfo
router.get('/profile/cb-line', UserInfoCtrl.callbackLine);
router.get('/profile', Middleware.authentication, UserInfoCtrl.getUserInfo);
router.post('/profile/edit', Middleware.authentication, UserInfoCtrl.editUserInfo);
// lpinfo
router.get('/lpinfo', Middleware.authentication, LpinfoCtrl.getLpList);
router.get('/lpinfo/limit=:limit&offset=:offset', Middleware.authentication, LpinfoCtrl.getLpList);
router.post('/lpinfo/add', Middleware.authentication, LpinfoCtrl.insertLpinfo);
router.post('/lpinfo/delete', Middleware.authentication, LpinfoCtrl.deleteLpinfo);
// login
router.get('/cb-line', LoginCtrl.callbackLine);
router.get('/logout', Middleware.authentication, LoginCtrl.logout);
router.post('/login', LoginCtrl.login);
// register
router.post('/register', RegisterCtrl.register);
// checkpoint
router.get('/checkpoint', Middleware.authentication, Middleware.checkAdminRole, CheckpointCtrl.getCheckpoint);
router.get('/checkpoint/limit=:limit&offset=:offset', Middleware.authentication, Middleware.checkAdminRole, CheckpointCtrl.getCheckpoint);
router.post('/checkpoint/add', Middleware.authentication, Middleware.checkAdminRole, CheckpointCtrl.insertCheckpoint);
router.post('/checkpoint/delete', Middleware.authentication, Middleware.checkAdminRole, CheckpointCtrl.deleteCheckpoint);
router.post('/checkpoint/edit', Middleware.authentication, Middleware.checkAdminRole, CheckpointCtrl.editCheckpoint);
// charges
router.get('/charges', Middleware.authentication, Middleware.checkAdminRole, ChargesCtrl.getCharges);
router.get('/charges/limit=:limit&offset=:offset', Middleware.authentication, Middleware.checkAdminRole, ChargesCtrl.getCharges);
router.post('/charges/add', Middleware.authentication, Middleware.checkAdminRole, ChargesCtrl.insertCharges);
router.post('/charges/delete', Middleware.authentication, Middleware.checkAdminRole, ChargesCtrl.deleteCharges);
router.post('/charges/edit', Middleware.authentication, Middleware.checkAdminRole, ChargesCtrl.editCharges);
// transaction
router.get('/transaction', TransactionCtrl.genTransactionPDF);
//# sourceMappingURL=routes.js.map