// controllers/rolesController.js
const { Role } = require('../models');
const { body, validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
};

exports.create = [
  body('nombre').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const role = await Role.create(req.body);
    res.status(201).json(role);
  }
];

// Repite para update y delete...