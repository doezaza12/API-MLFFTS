import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';

dotenv.config();

import { Configuration } from './util/config';
import { DAL } from './model/data-access/data-access';
import { router as Router } from './routes/routes';

const app = express();

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));

// init
new Configuration(process.env.config_path || './config.json');
new DAL(Configuration.mySql);

app.use(Router);

app.listen(8080, () => {
    console.log('connected to port 8080');
});