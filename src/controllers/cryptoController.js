const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const cryptoService = require('../service/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');

// URL: /accessories/create
router.get('/catalog', async (req, res) => {
    const allCrypto = await cryptoService.getAll();

    res.render('crypto/catalog', { allCrypto })
});

router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;

    const crypto = await cryptoService.getOne(cryptoId).lean();

    const isOwner = req.user?._id == crypto.owner;

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


router.post('/create', isAuthenticated, async (req, res) => {
    const { name, imageUrl, price, description, method } = req.body;

    try {
        await cryptoService.createOne(req.user._id, { name, imageUrl, price, description, method });
    } catch (err) {
        return res.status(400).render('crypto/create', { error: getErrorMessage(err) });
    }

    res.redirect('/crypto/catalog')
});


module.exports = router;