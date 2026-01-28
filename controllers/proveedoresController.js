const { Proveedor } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const proveedores = await Proveedor.findAll();
  res.json(proveedores);
};

exports.getById = async (req, res) => {
  const proveedor = await Proveedor.findByPk(req.params.id);
  if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
  res.json(proveedor);
};

exports.create = [
  body('nombre').notEmpty(),
  body('email').optional().isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const proveedor = await Proveedor.create(req.body);
    res.status(201).json(proveedor);
  }
];

exports.update = async (req, res) => {
  const proveedor = await Proveedor.findByPk(req.params.id);
  if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
  await proveedor.update(req.body);
  res.json(proveedor);
};

exports.delete = async (req, res) => {
  const proveedor = await Proveedor.findByPk(req.params.id);
  if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
  await proveedor.destroy();
  res.json({ message: 'Proveedor eliminado' });
};