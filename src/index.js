const express = require('express');
const setupViewEngine = require('./config/viewEngine');

const routes = require('./routes');


const port = 3000;

const app = express();
setupViewEngine(app);

app.use(express.static('src/static'));
app.use(express.urlencoded({extended: false}));
app.use(routes);


app.listen(port, () => console.log(`Server is listening on port 3000...`));