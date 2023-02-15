const router = require('express').Router();
const { getHomeController } = require('./controllers/homeController');
const authControler = require('./controllers/authController')




router.get('/', getHomeController);
router.get('/crypto/search', (req, res) => {
    res.render('search');
});

router.get('/register', authControler.getRegisterController);
router.post('/register', authControler.postRegisterController);
router.get('/login', authControler.getLoginController);
router.post('/login', authControler.postLoginController);


module.exports = router;