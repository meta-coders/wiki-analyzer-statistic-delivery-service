'use strict';

const app = require('./app')();
const port = process.env.PORT || 3001;

app.listen(port, '0.0.0.0').then(() => app.swagger());
