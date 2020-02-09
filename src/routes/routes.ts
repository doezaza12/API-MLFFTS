import * as express from 'express';

import * as Middleware from '../middleware/auth';

import * as AccountCtrl from '../controller/account';
import * as UserInfoCtrl from '../controller/user_info';
import * as LoginCtrl from '../controller/login';
import * as RegisterCtrl from '../controller/register';
import * as CheckpointCtrl from '../controller/checkpoint';
import * as ChargesCtrl from '../controller/charges';

const router = express.Router();

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

export { router };