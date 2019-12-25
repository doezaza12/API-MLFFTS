import * as express from 'express';

import * as Middleware from '../middleware/auth';

import * as AccountCtrl from '../controller/account';
import * as LoginCtrl from '../controller/login';
import * as RegisterCtrl from '../controller/register';

const router = express.Router();

// account
router.get('/getaccountlist', AccountCtrl.getAccountList); // testing route
// router.post('/addAccount', AccountCtrl.insertAccount);

// login
router.get('/cb-line', LoginCtrl.callbackLine);
router.get('/logout', Middleware.authentication, LoginCtrl.logout);
router.post('/login', LoginCtrl.login);

// register
router.post('/register', RegisterCtrl.register);

export { router };