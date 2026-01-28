const { Pago } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const pagos = await Pago.findAll();
  res.json(pagos);
};

exports.getById = async (req, res) => {
  const pago = await Pago.findByPk(req.params.id, { include: 'Venta' });
  if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
  res.json(pago);
};

exports.create = [
  body('id_venta').isInt(),
  body('monto').isFloat({ min: 0 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const pago = await Pago.create(req.body);
    res.status(201).json(pago);
  }
];

exports.update = async (req, res) => {
  const pago = await Pago.findByPk(req.params.id);
  if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
  await pago.update(req.body);
  res.json(pago);
};

exports.delete = async (req, res) => {
  const pago = await Pago.findByPk(req.params.id);
  if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
  await pago.destroy();
  res.json({ message: 'Pago eliminado' });
};