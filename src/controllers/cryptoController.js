const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const cryptoService = require('../service/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');
const { getPaymentMethodViewData } = require('../utils/viewDataUtils');

// URL: /accessories/create
router.get('/catalog', async (req, res) => {
    const allCrypto = await cryptoService.getAll();

    res.render('crypto/catalog', { allCrypto })
});

router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;

    const crypto = await cryptoService.getOne(cryptoId).lean();

    const isOwner = req.user?._id == crypto.owner;
    const isBuyer = crypto.buyers?.some(id => id == req.user?._id);

    if (!crypto) {
        return res.redirect('/404')
    }
    res.render('crypto/details', { crypto, isOwner, isBuyer });
});

router.get('/:cryptoId/buy', isAuthenticated, async (req, res) => {

    await cryptoService.buy(req.user._id, req.params.cryptoId);

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/search', isAuthenticated, async (req, res) => {
    const { name, method } = req.query;

    const paymentMethod = getPaymentMethodViewData(method);

    const allCrypto = await cryptoService.search(name, method);

    res.render('crypto/search', { allCrypto, name, paymentMethod });
});

router.get('/:cryptoId/edit', isAuthenticated, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId).lean();

    const paymentMethod = getPaymentMethodViewData(crypto.method);


    res.render('crypto/edit', { crypto, paymentMethod })
});

router.post('/:cryptoId/edit', isAuthenticated, async (req, res) => {
    const cryptoData = req.body;
    const cryptoId = req.params.cryptoId;
    try {
        await cryptoService.editOne(cryptoId, cryptoData);
    } catch (err) {
        res.render('crypto/edit', { error: getErrorMessage(err) })
    }

    res.redirect(`/crypto/${cryptoId}/details`)
})


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

router.get('/:cryptoId/delete', async (req, res) => {

    await cryptoService.deleteOne(req.params.cryptoId);

    res.redirect('/crypto/catalog')
})


module.exports = router;