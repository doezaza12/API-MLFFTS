import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';

import { DAL } from '../model/data-access/data-access';
import { user_infoAttribute } from '../model/db';

// export async function insertAccount(req: express.Request, res: express.Response, next: express.NextFunction) {
//     try {
//         let data: accountAttribute;
//         data.username = req.body.username ? req.body.username : null;
//         data.password = req.body.password ? req.body.password : null;
//         data.line_id = req.body.line_id ? req.body.line_id : null;
//         data._isVerify = req.body.line_id ? 1 : 0;
//         DAL.accountDAL.insertAccount(data);
//         return res.status(HttpStatus.CREATED).send();
//     } catch (err) {
//         console.error(err);
//         return res.status(HttpStatus.NOT_FOUND).send();
//     }
// }