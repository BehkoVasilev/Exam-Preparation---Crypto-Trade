const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const cryptoService = require('../service/cryptoService');

// URL: /accessories/create
router.get('/catalog', (req, res) => {
    res.render('crypto/catalog')
});

router.get('/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;

    const crypto = await cryptoService.getOne(cryptoId)
    // const isOwner = req.user?._id == cube.owner;

    if (!crypto) {
        return res.redirect('/404')
    }
    res.render('crypto/details', { crypto, isOwner });
});
router.get('/search', isAuthenticated, (req, res) => {
    res.render('crypto/search')
});

router.get('/edit', (req, res) => {
    res.render('crypto/edit')
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('crypto/create');
});

// router.post('/create', async (req, res) =>{
//     const {name, description, imageUrl} = req.body;

//      await Accessory.create({name, description, imageUrl});

//     res.redirect('/')
// });


module.exports = router;