import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Configuration } from './util/config';
import { DAL } from './model/data-access/data-access';
import { router as Router } from './routes/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// init
new Configuration('../config.json');
new DAL(Configuration.mySql);

app.use(Router);

app.listen(8080, () => {
    console.log('connected to port 8080');
});