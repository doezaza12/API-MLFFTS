"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Middleware = require("../middleware/auth");
const AccountCtrl = require("../controller/account");
const LoginCtrl = require("../controller/login");
const RegisterCtrl = require("../controller/register");
const router = express.Router();
exports.router = router;
// account
router.get('/getaccountlist', Middleware.authentication, AccountCtrl.getAccountList);
// router.post('/addAccount', AccountCtrl.insertAccount);
// login
router.get('/cb-line', LoginCtrl.callbackLine);
router.post('/login', LoginCtrl.login);
// register
router.post('/register', RegisterCtrl.register);
//# sourceMappingURL=routes.js.map