const express = require('express');
const { getAll, getById } = require('../controllers/movimientosInventarioController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
// No POST/PUT/DELETE, ya que se insertan automáticamente

module.exports = router;