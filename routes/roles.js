// routes/roles.js
const express = require('express');
const { getAll, create } = require('../controllers/rolesController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticate, authorize(['Admin']), getAll);
router.post('/', authenticate, authorize(['Admin']), create);

module.exports = router;