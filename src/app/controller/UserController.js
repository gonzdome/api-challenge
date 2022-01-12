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
      const user = req.body;
      const send = await User(user).save();
      return res.json({ error: false, user: send });
    } catch (err) {
      return res.json(err.message);
    }
  }
}

module.exports = new UserController();
