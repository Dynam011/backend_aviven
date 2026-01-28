const { Insumo } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const insumos = await Insumo.findAll();
  res.json(insumos);
  
};

exports.getById = async (req, res) => {
  const insumo = await Insumo.findByPk(req.params.id);
  if (!insumo) return res.status(404).json({ error: 'Insumo no encontrado' });
  res.json(insumo);
};

exports.create = [
  body('nombre').notEmpty(),
  body('tipo').notEmpty(),
  body('unidad').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const insumo = await Insumo.create(req.body);
    res.status(201).json(insumo);
  }
];

exports.update = async (req, res) => {
  const insumo = await Insumo.findByPk(req.params.id);
  if (!insumo) return res.status(404).json({ error: 'Insumo no encontrado' });
  await insumo.update(req.body);
  res.json(insumo);
};

exports.delete = async (req, res) => {
  const insumo = await Insumo.findByPk(req.params.id);
  if (!insumo) return res.status(404).json({ error: 'Insumo no encontrado' });
  await insumo.destroy();
  res.json({ message: 'Insumo eliminado' });
};