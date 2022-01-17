const { Router } = require('express');

const UserController = require('../app/controller/UserController');
const authenticateJWT = require('../middleware/authjwt');

const routes = new Router();

routes.get('/:name', authenticateJWT, UserController.index);

routes.post('/signup', UserController.store);

routes.post('/login', UserController.login);

module.exports = routes;
