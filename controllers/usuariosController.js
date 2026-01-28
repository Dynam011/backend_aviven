const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const usuarios = await Usuario.findAll({ include: 'Role' });
  res.json(usuarios);
};

exports.getById = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id, { include: 'Role' });
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

exports.create = [
  
  body('nombre_usuario').notEmpty(),
  body('nombre_completo').notEmpty(),
  body('password').isLength({ min: 6 }),
  body('id_rol').isInt(),
  async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }
      

    const { password, ...userData } = req.body;
    userData.password_hash = bcrypt.hashSync(password, 10);
    const usuario = await Usuario.create(userData);
    res.status(201).json(usuario);
  }
];

exports.update = [
  body('password').optional().isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { password, ...updateData } = req.body;
    if (password) updateData.password_hash = bcrypt.hashSync(password, 10);
    await usuario.update(updateData);
    res.json(usuario);
  }
];

exports.delete = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  await usuario.destroy();
  res.json({ message: 'Usuario eliminado' });
};