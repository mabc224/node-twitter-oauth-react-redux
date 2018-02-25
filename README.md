# User authentication application with Node Twitter(oauth) react redux
 
This is a simple oauth twitter application which provides Login with twitter, displays user profile data, get tweets and logout functionality.


## React Twitter APP (frontend)



### Setup

```
npm install
npm start
```

### Run Server

`http://127.0.0.1:3000`

### Routes

```
http://127.0.0.1:3000/
http://127.0.0.1:3000/login
http://127.0.0.1:3000/logout (authenticated)
http://127.0.0.1:3000/profile (authenticated)
```

==============================================
----------------------------------------------

## Backend API

This part is written to handle user registration, get tweets

#### Config

Set up twitter oauth app `https://apps.twitter.com` and get credentials
Site URL: `http://127.0.0.1:4000/`
Callback URL: `http://127.0.0.1:4000/oauth_request/callback`
Set your twitter config params in `config/twitter.config.js`
This application is also depend on mongo database, Please check it is running in background.

### Setup

```
npm install
npm run start
```

### Run Server

`http://localhost:4000`


### External References and Resources

* [Twitter | Application Management](https://apps.twitter.com)


