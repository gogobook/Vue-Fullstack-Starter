// import { URL } from 'url';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// import Raven from 'raven';

import routes from './api';

// const isLocalhost = new URL(process.env.FUNC_URL).hostname === 'localhost'

admin.initializeApp(functions.config().firebase);

// if (!isLocalhost) {
//   Raven.config(SENTRY_DSN).install();
// }

const vm = express();

// if (!isLocalhost) {
//   vm.use(Raven.requestHandler());
// }

vm.use(compression());
vm.use(cors({ origin: true }));
vm.use(morgan('tiny'));
vm.use(bodyParser.json());
vm.use(bodyParser.urlencoded({ extended: false }));

vm.use('/', routes);

// if (!isLocalhost) {
//   vm.use(Raven.errorHandler());
// }

export const api = functions.https.onRequest(vm);

export const env = functions.https.onRequest((req, res) => {
  cors({ origin: true })(req, res, () => {
    res.send(process.env.NODE_ENV);
  });
});
