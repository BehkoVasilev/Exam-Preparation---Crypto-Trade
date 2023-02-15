const router = require('express').Router();
const { getHomeController } = require('./controllers/homeController');




router.get('/', getHomeController);

router.get('/crypto/search', (req, res) => {
    res.render('search');
});


module.exports = router;