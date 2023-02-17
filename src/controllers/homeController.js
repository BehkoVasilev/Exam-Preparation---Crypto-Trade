const { getAll } = require("../service/cryptoService");
const { getErrorMessage } = require("../utils/errorUtils");

exports.getHomeController = async (req, res) => {
    try {
        const allCryptos = await getAll();
        res.render('home', { allCryptos })
    } catch (err) {
        return res.status(400).render('home', { error: getErrorMessage })
    }

};

exports.get404Controller = (req, res) => {
    res.render('404')
};