import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';

import { Configuration } from './util/config';
import { DAL } from './model/data-access/data-access';
import { router as Router } from './routes/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// init mysql
const config = new Configuration('../db.config.json').mySql;
new DAL(config);

app.use(Router);

app.listen(8080, () => {
    console.log('connected...');
    console.log(jwt.sign({ data: 'abc' }, 'there-is-no-secret.', { expiresIn: '1h' }));
});