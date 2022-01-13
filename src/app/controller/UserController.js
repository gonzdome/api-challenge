const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

class UserController {
  async index(req, res) {
    try {
      const user = await User.find();
      return res.json(user);
    } catch (err) {
      return res.json(err.message);
    }
  }

  async store(req, res) {
    try {
      const { name, email } = req.body;

      const salt = await bcrypt.genSalt(6);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = { name, email, password };

      const send = await User(user).save();
      return res.json({ message: send });
    } catch (err) {
      return res.json(err.message);
    }
  }
}

module.exports = new UserController();
