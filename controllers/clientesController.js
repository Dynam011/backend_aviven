const { Cliente } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const clientes = await Cliente.findAll({ include: 'Usuario' });
  res.json(clientes);
};

exports.getById = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id, { include: 'Usuario' });
  if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
  res.json(cliente);
};

exports.create = [
  body('nombre').notEmpty(),
  body('contacto').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  }
];

exports.update = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
  await cliente.update(req.body);
  res.json(cliente);
};

exports.delete = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
  await cliente.destroy();
  res.json({ message: 'Cliente eliminado' });
};