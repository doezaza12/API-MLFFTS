import * as express from 'express';

import * as AccountCtrl from '../controller/account';
import * as LoginCtrl from '../controller/login';

const router = express.Router();

// account
router.get('/getaccountlist', AccountCtrl.getAccountList);
router.post('/addAccount', AccountCtrl.insertAccount);

// login
router.get('/cb-line', LoginCtrl.callbackLine);

export { router };