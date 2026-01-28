const express = require('express');
const { getAll, getById, create, update, delete: deleteProduccion } = require('../controllers/produccionController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteProduccion);

module.exports = router;