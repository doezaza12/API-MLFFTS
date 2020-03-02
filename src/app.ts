import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

import { Configuration } from './util/config';
import { DAL } from './model/data-access/data-access';
import { router as Router } from './routes/routes';

const app = express();

app.use(cors({ origin: ['https://mlffts-web.herokuapp.com', 'http://localhost:8080'] }))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));

// init
new Configuration('./config.json');
new DAL(Configuration.mySql);

app.use(Router);

app.listen((process.env.PORT || 8080), () => {
    console.log(`connected to port ${process.env.PORT || 8080}`);
});