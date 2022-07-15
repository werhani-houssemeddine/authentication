const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const {createClient} = require('redis');
const Redis = require('connect-redis')(session);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main'
}))

app.get('/', (req, res) => res.render('home'));

app.listen(port, () => console.log(`Listenning on port ${port}`));