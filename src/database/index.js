const mongoose = require('mongoose');

class DBConnection {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnect = mongoose.connect(
      'mongodb://localhost/challenge',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  }
}

module.exports = new DBConnection();
