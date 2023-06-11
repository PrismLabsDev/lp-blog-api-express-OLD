const { Router } = require('express');

// Controllers
const IndexController = require('../controllers/IndexController');

const router = Router();

// Identify
router.get('/', IndexController.index);

module.exports = router;
