import * as express from 'express';

import * as AccountCtrl from '../controller/account'

const router = express.Router();

router.get('/getaccountlist', AccountCtrl.getAccountList)

export { router };