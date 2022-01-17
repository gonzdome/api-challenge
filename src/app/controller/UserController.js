const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

class UserController {
  async index(req, res) {
    try {
      const name = req.params;
      const user = await User.findOne(name);

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

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user === null || user === undefined) {
        return res.json({ message: 'User does not exists!' });
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.json({ message: 'Password does not match!' });
      }

      const token = jwt.sign({ username: user.name }, process.env.TOKEN_SECRET, { expiresIn: '2m' });

      return res.json({ user, token });
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
}

module.exports = new UserController();
