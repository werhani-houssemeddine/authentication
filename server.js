const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const redis = require('redis');
const Redis = require('connect-redis')(session);
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import local files
const handler = require('./lib/handler');
const redis_db = require('./lib/db_file');
const routes = require('./lib/routers');

const app = express();
const port = process.env.PORT || 3000;
redis_db;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'random key',
    /*store: new Redis({
        url: '127.0.0.1:6379',
        client: redis_db,
        logErrors: true
    })*/
}));

mongoose.connect('mongodb://localhost:27017/first_db');
const mongodb = mongoose.connection;

mongodb.on('error', (err) => console.error(err));

// Set up handlebars engine
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
}));

app.use(handler.loging);

routes.forEach(route => app[route.method](route.path, route.handler))
app.use(handler.notFound);
app.use(handler.error);

mongodb.once('open', () => app.listen(port, () => console.log(`Listenning on port ${port}`)));