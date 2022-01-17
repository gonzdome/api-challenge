const jwt = require('jsonwebtoken');
const User = require('../app/models/UserModel');

const config = process.env;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    const { username } = decoded;
    const userParam = req.params.name;

    if (username !== userParam) {
      return res.status(401).json('You do not have permission!');
    }

    const user = await User.findOne({ username });
    req.user = user;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;
