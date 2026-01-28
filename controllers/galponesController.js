const { Galpon } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const galpones = await Galpon.findAll();
  res.json(galpones);
};

exports.getById = async (req, res) => {
  const galpon = await Galpon.findByPk(req.params.id);
  if (!galpon) return res.status(404).json({ error: 'Galpón no encontrado' });
  res.json(galpon);
};

exports.create = [
  body('nombre').notEmpty(),
  body('capacidad').isInt({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const galpon = await Galpon.create(req.body);
    res.status(201).json(galpon);
  }
];

exports.update = async (req, res) => {
  const galpon = await Galpon.findByPk(req.params.id);
  if (!galpon) return res.status(404).json({ error: 'Galpón no encontrado' });
  await galpon.update(req.body);
  res.json(galpon);
};

exports.delete = async (req, res) => {
  const galpon = await Galpon.findByPk(req.params.id);
  if (!galpon) return res.status(404).json({ error: 'Galpón no encontrado' });
  await galpon.destroy();
  res.json({ message: 'Galpón eliminado' });
};