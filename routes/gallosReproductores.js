const express = require('express');
const { getAll, getById, create, update, delete: deleteGallo } = require('../controllers/gallosReproductoresController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteGallo);

module.exports = router;