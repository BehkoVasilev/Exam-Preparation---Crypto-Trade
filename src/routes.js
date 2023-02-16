const router = require('express').Router();
const { getHomeController, get404Controller } = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController');
const { isAuthenticated } = require('./middlewares/authenticationMiddleware');




router.get('/', getHomeController);

router.get('/register', authController.getRegisterController);
router.post('/register', authController.postRegisterController);
router.get('/login', authController.getLoginController);
router.post('/login', authController.postLoginController);
router.get('/logout', isAuthenticated, authController.getLogoutController);

router.use('/crypto', cryptoController);

router.use('*', get404Controller);

module.exports = router;