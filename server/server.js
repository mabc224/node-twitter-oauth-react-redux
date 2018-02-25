'use strict';

//mongoose file must be loaded before all other files in order to provide
// models to other modules
const mongoose = require('mongoose'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    TwitterTokenStrategy = require('passport-twitter-token'),
    User = require('./modal/User'),
    twitterConfig = require('./config/twitter.config.js');

mongoose.connect('mongodb://localhost:27017/twitter-app');

passport.use(new TwitterTokenStrategy({
        consumerKey: twitterConfig.consumerKey,
        consumerSecret: twitterConfig.consumerSecret,
        includeEmail: true
    },
    function (token, tokenSecret, profile, done) {
        User.upsertTwitterUser(token, tokenSecret, profile, function (err, user) {
            return done(err, user);
        });
}));


let app = express();

// enable cors
let corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));

mongoose.connection.on('connected', function () {
    console.log("Mongoose default connection is open ",);
    app.listen(4000);
    console.log('Server running at http://localhost:4000/');
});

mongoose.connection.on('error', function (err) {
    console.log("Mongoose connection: error has occured " + err);
});

