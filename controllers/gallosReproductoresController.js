const { GalloReproductor } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const gallos = await GalloReproductor.findAll({ include: 'Galpon' });
  res.json(gallos);
};

exports.getById = async (req, res) => {
  const gallo = await GalloReproductor.findByPk(req.params.id, { include: 'Galpon' });
  if (!gallo) return res.status(404).json({ error: 'Registro de gallo no encontrado' });
  res.json(gallo);
};

exports.create = [
  body('id_galpon').isInt(),
  body('cantidad').isInt({ min: 1 }),
  body('fecha_ingreso').isDate(),
  body('estado').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const gallo = await GalloReproductor.create(req.body);
    res.status(201).json(gallo);
  }
];

exports.update = async (req, res) => {
  const gallo = await GalloReproductor.findByPk(req.params.id);
  if (!gallo) return res.status(404).json({ error: 'Registro de gallo no encontrado' });
  await gallo.update(req.body);
  res.json(gallo);
};

exports.delete = async (req, res) => {
  const gallo = await GalloReproductor.findByPk(req.params.id);
  if (!gallo) return res.status(404).json({ error: 'Registro de gallo no encontrado' });
  await gallo.destroy();
  res.json({ message: 'Registro de gallo eliminado' });
};