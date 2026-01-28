const jwt = require('jsonwebtoken');
const { Usuario, Role } = require('../models');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id, { include: Role });
    if (!usuario) throw new Error();
    req.user = usuario;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.Role.nombre)) {
    return res.status(403).json({ error: 'Permisos insuficientes' });
  }
  next();
};

module.exports = { authenticate, authorize };