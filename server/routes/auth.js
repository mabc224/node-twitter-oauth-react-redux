const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const request = require('request');
const qs = require('querystring');
const twitterConfig = require('./../config/twitter.config.js');
const User = require('./../modal/User');

let createToken = function (auth) {
    return jwt.sign({
            id: auth.id
        }, 'secret-token',
        {
            expiresIn: 60 * 120
        });
};

let generateToken = function (req, res, next) {
    console.log(req.auth);
    console.log('------------');
    console.log(req.user);
    req.token = createToken(req.auth);
    return next();
};

let sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

router.route('/oauth_request/callback')
    .post(function (req, res) {
        request.post({
            url: 'https://api.twitter.com/oauth/request_token',
            oauth: {
                oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Flogin",
                consumer_key: twitterConfig.consumerKey,
                consumer_secret: twitterConfig.consumerSecret
            }
        }, function (err, r, body) {
            if (err) {
                return res.send(500, {message: err.message});
            }

            let reqData = qs.parse(body);
            res.send(reqData);
        });
    });

router.route('/oauth_request')
    .post((req, res, next) => {
        console.log('oauth_request');
        request.post({
            url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
            oauth: {
                consumer_key: twitterConfig.consumerKey,
                consumer_secret: twitterConfig.consumerSecret,
                token: req.query.oauth_token
            },
            form: {oauth_verifier: req.query.oauth_verifier}
        }, function (err, r, body) {
            console.log('oauth_request full filled');
            if (err) {
                return res.send(500, {message: err.message});
            }
            let reqData = qs.parse(body);
            req.body['oauth_token'] = reqData.oauth_token;
            req.body['oauth_token_secret'] = reqData.oauth_token_secret;
            req.body['user_id'] = reqData.user_id;

            next();
        });
    }, passport.authenticate('twitter-token', {session: false}), function (req, res, next) {
        console.log('passport');
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        return next();
    }, generateToken, sendToken);

//token handling middleware
let authenticate = expressJwt({
    secret: 'secret-token',
    requestProperty: 'auth',
    getToken: function (req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});

let getCurrentUser = function (req, res, next) {
    User.findById(req.auth.id, function (err, user) {
        if (err) {
            next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

let getOne = function (req, res) {
    let user = req.user.toObject();

    delete user['twitterProvider'];
    delete user['__v'];

    res.json(user);
};

router.route('/auth/me')
    .get(authenticate, getCurrentUser, getOne);


let getUserWithToken = function (req, res, next) {

    User.findById(req.auth.id, {"email": 1, "twitterProvider": 1}, function (err, user) {
        if (err) {
            next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

router.route('/tweets')
    .get(authenticate, getUserWithToken, function (req, res, next) {
        let user = req.user;
        let id = user.twitterProvider.id;
        let token = user.twitterProvider.token;
        let tokenSecret = user.twitterProvider.tokenSecret;

        //Make a request to get User's 100 latest tweets
        // https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html
        var apiUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json" + "?"
            + qs.stringify({user_id: id, count: 100});

        var authenticationData = {
            consumer_key: twitterConfig.consumerKey,
            consumer_secret: twitterConfig.consumerSecret,
            token: token,
            token_secret: tokenSecret
        };

        request.get({url: apiUrl, oauth: authenticationData, json: true}, function (err, r, body) {
            if (err) {
                return res.send(500, {message: err.message});
            }
            var tweets = [];
            for (let i in body) {
                var tweetObj = body[i];
                tweets.push(tweetObj.text);
            }

            // var dataToSEnd = {
            //     email: user.email,
            //     tweets: tweets
            // };

            res.json(tweets);

        });


    });


module.exports = router;
