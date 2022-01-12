const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/user.routes');

require('./database');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  routes() {
    this.server.use('/user', userRoutes);
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(morgan('dev'));
    this.server.use(cors());
  }
}

module.exports = new App().server;
