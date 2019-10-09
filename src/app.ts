import * as express from 'express';
import { Sequelize } from 'sequelize'

import { Configuration } from './util/config';
import { MySQLConnector } from './util/database';

const app = express();
const config = new Configuration('../db.config.json').mySql;
