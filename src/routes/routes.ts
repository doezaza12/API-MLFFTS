import * as express from 'express';

import * as Middleware from '../middleware/auth';

import * as AccountCtrl from '../controller/account';
import * as UserInfoCtrl from '../controller/user_info';
import * as LoginCtrl from '../controller/login';
import * as RegisterCtrl from '../controller/register';
import * as CheckpointCtrl from '../controller/checkpoint';
import * as ChargesCtrl from '../controller/charges';
import * as LpinfoCtrl from '../controller/lp_info';
import * as TransactionCtrl from '../controller/transaction';
import * as WebhookCtrl from '../controller/webhook';

const router = express.Router();

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

// webhook
router.post('/webhook', WebhookCtrl.webHook);

export { router };