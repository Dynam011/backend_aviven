const express = require('express');
const { getAll, getById, create, update, delete: deletePago } = require('../controllers/pagosController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAll);
router.get('/:id', authenticate, getById);
router.post('/', authenticate, authorize(['Admin', 'Usuario']), create);
router.put('/:id', authenticate, authorize(['Admin']), update);
router.delete('/:id', authenticate, authorize(['Admin']), deletePago);

module.exports = router;