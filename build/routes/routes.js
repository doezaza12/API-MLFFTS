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
const router = express.Router();
exports.router = router;
// account
router.get('/getaccountlist', AccountCtrl.getAccountList); // testing route
// router.post('/addAccount', AccountCtrl.insertAccount);
// userinfo
router.get('/profile', Middleware.authentication, UserInfoCtrl.getUserInfo);
router.post('/profile/edit', Middleware.authentication, UserInfoCtrl.editUserInfo);
// login
router.get('/cb-line', LoginCtrl.callbackLine);
router.get('/logout', Middleware.authentication, LoginCtrl.logout);
router.post('/login', LoginCtrl.login);
// register
router.post('/register', RegisterCtrl.register);
// checkpoint
router.post('/checkpoint/add', CheckpointCtrl.insertCheckpoint);
// charges
router.post('/charges/add', ChargesCtrl.insertCharges);
//# sourceMappingURL=routes.js.map