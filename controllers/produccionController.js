const { Produccion, MovimientoInventario, Insumo, sequelize } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const producciones = await Produccion.findAll({ include: ['Lote', 'Insumo'] });
  res.json(producciones);
};

exports.getById = async (req, res) => {
  const produccion = await Produccion.findByPk(req.params.id, { include: ['Lote', 'Insumo'] });
  if (!produccion) return res.status(404).json({ error: 'Producción no encontrada' });
  res.json(produccion);
};

exports.create = [
  body('id_lote').isInt(),
  body('fecha').isDate(),
  body('cantidad').isInt({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const transaction = await sequelize.transaction();
    try {
      const produccion = await Produccion.create(req.body, { transaction });
      await MovimientoInventario.create({
        id_insumo: req.body.id_insumo,
        tipo_movimiento: 'Entrada por Producción',
        cantidad: req.body.cantidad,
        id_referencia_origen: produccion.id_produccion,
        tabla_referencia_origen: 'produccion',
      }, { transaction });
      await Insumo.increment('stock_actual', { by: req.body.cantidad, where: { id_insumo: req.body.id_insumo }, transaction });
      await transaction.commit();
      res.status(201).json(produccion);
    } catch (err) {
      console.log(err)
      await transaction.rollback();
      res.status(500).json({ error: err.message });
    }
  }
];

exports.update = async (req, res) => {
  const produccion = await Produccion.findByPk(req.params.id);
  if (!produccion) return res.status(404).json({ error: 'Producción no encontrada' });
  await produccion.update(req.body);
  res.json(produccion);
};

exports.delete = async (req, res) => {
  const produccion = await Produccion.findByPk(req.params.id);
  if (!produccion) return res.status(404).json({ error: 'Producción no encontrada' });
  await produccion.destroy();
  res.json({ message: 'Producción eliminada' });
};