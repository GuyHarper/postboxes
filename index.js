const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.plugin(require('./lib/globalToJSON'));

const router = require('./config/router');

const { dbURI, port } = require('./config/environment');

mongoose.connect(dbURI, { useMongoClient: true });

app.use(router);

app.listen(port, () => console.log(`Express is up and running on port ${port}`));
