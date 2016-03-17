/**
 * Created by Yangwook Ryoo on 1/29/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportLocal from 'passport-local';
import helmet from 'helmet';
import api from './middleware/api';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Html from './components/Html.react';
//import mysql from 'mysql';
//import * as db from './constants/db';
import userdata from './tempuser';

passport.use(new passportLocal.Strategy(
  function(username, password, cb) {
    userdata.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  userdata.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

//set up db
//const connection = mysql.createConnection(db.config);

const server = express();

//change port for each state
let env = process.env.NODE_ENV || 'development';
let port = 4321;
//default: development

if (env == 'production') {
  port = 3000;
} //production env
if (env == 'staging') {
  port = 4322;
} //staging env

//temp values
server.set("data", [
    {id:1, author: "Pete Hunt", text: "댓글입니다."},
    {id:2, author: "Jordan Walke", text: "*또 다른* 댓글입니다."}
  ]);


//defend basic attacks
server.use(helmet());
//session
server.use(expressSession({ secret: 'My Little kitty', resave: false, saveUninitialized: false }));
//static files
server.use(express.static(process.env.NODE_PATH + '/public')); //TODO add favicon, robots, etc.
//login routes
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
//api routes
server.use('/api', api);
//user authentication
server.use(passport.initialize());
server.use(passport.session());

server.get('/login', async (req, res, next) => {
  try {
    res.sendFile(process.env.NODE_PATH + "/public/login.html");
  } catch (err) {
    next(err);
  }
});

server.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'+req.user.username);
  }
);


server.get('*', async (req, res, next) => {
  try {
    const html = ReactDOMServer.renderToString(<Html username={req.user ? req.user.username : ''} />);
    res.send('<!DOCTYPE HTML>\n' + html);
  } catch (err) {
    next(err);
  }
});

server.listen(port, () => {
  console.log('server listening on %d!', port);
});