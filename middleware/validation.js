// Este archivo es un placeholder para validaciones personalizadas si las necesitas.
// Por ahora, las validaciones se manejan directamente en controladores con express-validator.
// Si quieres agregar middleware global, puedes expandirlo aquí.

const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { handleValidationErrors };