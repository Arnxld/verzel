const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const { token } = request.cookies;

  if (!token) {
    return response.status(403).json({ error: 'A token is required for authentication' });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET);

    request.user = user;
  } catch (err) {
    return response.status(401).json({ error: 'Invalid Token' });
  }
  return next();
};
