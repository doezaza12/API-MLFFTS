import * as express from 'express';

import * as AccountCtrl from '../controller/account'

const router = express.Router();

// get
router.get('/getaccountlist', AccountCtrl.getAccountList)
router.get('/login-line', AccountCtrl.callbackLine)

// post


export { router };