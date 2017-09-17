const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.Promise = require('bluebird');
const morgan = require('morgan');

const router = require('./config/router');

const { dbURI, port } = require('./config/environment');

mongoose.connect(dbURI, { useMongoClient: true });

app.use(morgan('dev'));

app.use(router);

app.listen(port, () => console.log(`Express is up and running on port ${port}`));
