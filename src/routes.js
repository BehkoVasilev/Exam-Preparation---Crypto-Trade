const router = require('express').Router();
const { getHomeController } = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController');



router.get('/', getHomeController);

router.get('/register', authController.getRegisterController);
router.post('/register', authController.postRegisterController);
router.get('/login', authController.getLoginController);
router.post('/login', authController.postLoginController);

router.use('/crypto', cryptoController);

module.exports = router;