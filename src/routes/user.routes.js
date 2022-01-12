const { Router } = require('express');

const UserController = require('../app/controller/UserController');

const routes = new Router();

routes.get('/', UserController.index);

routes.post('/signup', UserController.store);

module.exports = routes;
