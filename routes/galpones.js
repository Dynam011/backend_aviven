const express = require('express');
const { getAll, getById, create, update, delete: deleteGalpon } = require('../controllers/galponesController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteGalpon);

module.exports = router;