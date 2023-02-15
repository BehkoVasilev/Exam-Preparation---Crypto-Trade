const handlebars = require('express-handlebars');

function setupViewEngine(app) {
    app.engine('handlebars', handlebars.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}

module.exports = setupViewEngine;
