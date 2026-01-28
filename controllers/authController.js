const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Role } = require('../models');
const { body, validationResult } = require('express-validator');

exports.login = [
  body('nombre_usuario').notEmpty(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nombre_usuario, password } = req.body;
    const usuario = await Usuario.findOne({ where: { nombre_usuario }, include: Role });
    if (!usuario || !bcrypt.compareSync(password, usuario.password_hash)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: usuario.id_usuario, nombre: usuario.nombre_completo, rol: usuario.Role.nombre } });
  }
];