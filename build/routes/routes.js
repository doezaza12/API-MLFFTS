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
const NotifyCtrl = require("../controller/notification");
const HistoryCtrl = require("../controller/history");
const router = express.Router();
exports.router = router;
// account
router.get('/verify=:id', AccountCtrl.verifyAccount);
router.get('/account', Middleware.authentication, Middleware.checkAdminRole, AccountCtrl.getAccountList);
router.get('/account/limit=:limit&offset=:offset', Middleware.authentication, Middleware.checkAdminRole, AccountCtrl.getAccountList);
router.post('/account/edit', Middleware.authentication, Middleware.checkAdminRole, AccountCtrl.editAccountStatus);
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
// notification
router.get('/cb-state-notify', NotifyCtrl.callbackStateNotify);
router.post('/cb-notify', Middleware.authentication, NotifyCtrl.callbackNotify);
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
router.post('/transaction/add', Middleware.authentication, Middleware.checkAdminRole, TransactionCtrl.insertTransactions);
router.get('/transaction/gen', Middleware.authentication, TransactionCtrl.genTransactionPDF);
router.get('/transaction', Middleware.authentication, TransactionCtrl.getTransactions);
router.get('/transaction/limit=:limit&offset=:offset&status=:status', Middleware.authentication, TransactionCtrl.getTransactions);
router.get('/transaction/limit=:limit&offset=:offset', Middleware.authentication, TransactionCtrl.getTransactions);
// admin
router.get('/invalid/info', Middleware.authentication, Middleware.checkAdminRole, HistoryCtrl.getDataLostInfo);
router.get('/invalid/limit=:limit&offset=:offset&cpkid=:cpk_id', Middleware.authentication, Middleware.checkAdminRole, HistoryCtrl.getDataLostList);
//# sourceMappingURL=routes.js.map