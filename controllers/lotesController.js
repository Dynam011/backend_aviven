const { Lote } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const lotes = await Lote.findAll();
  res.json(lotes);
};

exports.getById = async (req, res) => {
  const lote = await Lote.findByPk(req.params.id);
  if (!lote) return res.status(404).json({ error: 'Lote no encontrado' });
  res.json(lote);
};

exports.create = [
  body('codigo_lote').notEmpty(),
  body('fecha_ingreso').isDate(),
  body('cantidad_inicial').isInt({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const lote = await Lote.create(req.body);
    res.status(201).json(lote);
  }
];

exports.update = async (req, res) => {
  const lote = await Lote.findByPk(req.params.id);
  if (!lote) return res.status(404).json({ error: 'Lote no encontrado' });
  await lote.update(req.body);
  res.json(lote);
};

exports.delete = async (req, res) => {
  const lote = await Lote.findByPk(req.params.id);
  if (!lote) return res.status(404).json({ error: 'Lote no encontrado' });
  await lote.destroy();
  res.json({ message: 'Lote eliminado' });
};