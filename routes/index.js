const api = require('./api');
const routes = require('express').Router();

routes.use('/api', api);

module.exports = routes;