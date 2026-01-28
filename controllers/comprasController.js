const { Compra, MovimientoInventario, Insumo, sequelize } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const compras = await Compra.findAll({ include: ['Proveedor', 'Insumo'] });
  res.json(compras);
};

exports.getById = async (req, res) => {
  const compra = await Compra.findByPk(req.params.id, { include: ['Proveedor', 'Insumo'] });
  if (!compra) return res.status(404).json({ error: 'Compra no encontrada' });
  res.json(compra);
};

exports.create = [
  body('id_proveedor').isInt(),
  body('id_insumo').isInt(),
  body('fecha').isDate(),
  body('cantidad').isFloat({ min: 0 }),
  body('precio_total').isFloat({ min: 0 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const transaction = await sequelize.transaction();
    try {
      const compra = await Compra.create(req.body, { transaction });
      await MovimientoInventario.create({
        id_insumo: req.body.id_insumo,
        tipo_movimiento: 'Entrada por Compra',
        cantidad: req.body.cantidad,
        id_referencia_origen: compra.id_compra,
        tabla_referencia_origen: 'compras',
      }, { transaction });
      await Insumo.increment('stock_actual', { by: req.body.cantidad, where: { id_insumo: req.body.id_insumo }, transaction });
      await transaction.commit();
      res.status(201).json(compra);
    } catch (err) {
      await transaction.rollback();
      res.status(500).json({ error: err.message });
    }
  }
];

exports.update = async (req, res) => {
  const compra = await Compra.findByPk(req.params.id);
  if (!compra) return res.status(404).json({ error: 'Compra no encontrada' });
  await compra.update(req.body);
  res.json(compra);
};

exports.delete = async (req, res) => {
  const compra = await Compra.findByPk(req.params.id);
  if (!compra) return res.status(404).json({ error: 'Compra no encontrada' });
  await compra.destroy();
  res.json({ message: 'Compra eliminada' });
};