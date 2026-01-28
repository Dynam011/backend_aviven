const { Venta, MovimientoInventario, Insumo, sequelize } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const ventas = await Venta.findAll({ include: ['Cliente', 'Insumo'] });
  res.json(ventas);
};

exports.getById = async (req, res) => {
  const venta = await Venta.findByPk(req.params.id, { include: ['Cliente', 'Insumo'] });
  if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
  res.json(venta);
};

exports.create = [
  body('id_cliente').isInt(),
  body('id_insumo').isInt(),
  body('fecha').isDate(),
  body('cantidad').isInt({ min: 1 }),
  body('precio_unitario').isFloat({ min: 0 }),
  body('estado').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { cantidad, precio_unitario } = req.body;
    const total = cantidad * precio_unitario;
    req.body.total = total;

    const transaction = await sequelize.transaction();
    try {
      const venta = await Venta.create(req.body, { transaction });
      await MovimientoInventario.create({
        id_insumo: req.body.id_insumo,
        tipo_movimiento: 'Salida por Venta',
        cantidad: -cantidad, // Negativo para salida
        id_referencia_origen: venta.id_venta,
        tabla_referencia_origen: 'ventas',
      }, { transaction });
      await Insumo.decrement('stock_actual', { by: cantidad, where: { id_insumo: req.body.id_insumo }, transaction });
      await transaction.commit();
      res.status(201).json(venta);
    } catch (err) {
      await transaction.rollback();
      res.status(500).json({ error: err.message });
    }
  }
];

exports.update = [
  body('estado').optional().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const venta = await Venta.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    await venta.update(req.body);
    res.json(venta);
  }
];

exports.delete = async (req, res) => {
  const venta = await Venta.findByPk(req.params.id);
  if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
  await venta.destroy();
  res.json({ message: 'Venta eliminada' });
};