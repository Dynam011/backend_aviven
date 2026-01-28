const { MovimientoInventario } = require('../models');

exports.getAll = async (req, res) => {
  const movimientos = await MovimientoInventario.findAll({ include: 'Insumo' });
  res.json(movimientos);
};

exports.getById = async (req, res) => {
  const movimiento = await MovimientoInventario.findByPk(req.params.id, { include: 'Insumo' });
  if (!movimiento) return res.status(404).json({ error: 'Movimiento no encontrado' });
  res.json(movimiento);
};