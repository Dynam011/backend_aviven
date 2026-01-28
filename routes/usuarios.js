const express = require('express');
const { getAll, getById, create, update, delete: deleteUsuario } = require('../controllers/usuariosController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/',  getAll);
router.get('/:id', authenticate, getById);
router.post('/', create);
router.put('/:id', authenticate, authorize(['Admin']), update);
router.delete('/:id', authenticate, authorize(['Admin']), deleteUsuario);

module.exports = router;