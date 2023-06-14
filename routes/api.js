const { Router } = require('express');

// Controllers
const AuthController = require('../controllers/AuthController');
const IndexController = require('../controllers/IndexController');

// Middleware
const auth = require('../middleware/authentication');

const router = Router();

// Auth
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.post('/auth/register/verify', AuthController.registerVerification);
router.post('/auth/password_reset', AuthController.passwordReset);
router.post('/auth/password_reset/verify', AuthController.passwordResetVerify);

// User
router.get('/', auth, IndexController.index);

// Article

// Comment


module.exports = router;
