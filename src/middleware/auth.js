const { verify } = require('../utils/jwt');
module.exports = function (req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'Token ausente' });
  const token = h.split(' ')[1];
  try {
    req.user = verify(token);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};