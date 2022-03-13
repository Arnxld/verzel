const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const [, token] = authorization.split(' ');

  try {
    await promisify(jwt.verify)(token, process.env.SECRET);
    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
};
