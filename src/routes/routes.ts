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
import * as NotifyCtrl from '../controller/notification';
import * as HistoryCtrl from '../controller/history';

const router = express.Router();

// account
router.get('/verify=:token', AccountCtrl.verifyAccount);
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
router.get('/lpinfo/wc', Middleware.authentication, Middleware.checkAdminRole, LpinfoCtrl.searchWildcardLpNum);
router.post('/lpinfo/add', Middleware.authentication, LpinfoCtrl.insertLpinfo);
router.post('/lpinfo/delete', Middleware.authentication, LpinfoCtrl.deleteLpinfo);

// login
router.post('/cb-line', LoginCtrl.callbackLine);
router.get('/logout', Middleware.authentication, LoginCtrl.logout);
router.get('/cb-line-token', LoginCtrl.callbackLineToken)
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
router.get('/transaction/single-gen', Middleware.authentication, TransactionCtrl.genSingleTransactionPDF);
router.get('/transaction/gen', Middleware.authentication, TransactionCtrl.genTransactionPDF);
router.get('/transaction', Middleware.authentication, TransactionCtrl.getTransactions);
// router.get('/transaction/limit=:limit&offset=:offset&status=:status', Middleware.authentication, TransactionCtrl.getTransactions);
// router.get('/transaction/limit=:limit&offset=:offset', Middleware.authentication, TransactionCtrl.getTransactions);

// admin
router.get('/invalid/info', Middleware.authentication, Middleware.checkAdminRole, HistoryCtrl.getDataLostInfo);
router.get('/invalid/limit=:limit&offset=:offset&cpkid=:cpk_id', Middleware.authentication, Middleware.checkAdminRole, HistoryCtrl.getDataLostList);

export { router };