const express = require('express');
const app = express();

const router = require('./config/router');

app.use(router);

app.listen(3000, () => console.log('listening on port 3000'));
