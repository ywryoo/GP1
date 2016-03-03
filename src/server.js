/**
 * Created by Yangwook Ryoo on 1/29/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import api from './middleware/api';
import passport from 'passport';
import {Strategy} from 'passport-local';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Html from './components/Html.react';
import mysql from 'mysql';
import * as db from './constants/db';

//set up db
const connection = mysql.createConnection(db.config);

//local user
passport.use(new Strategy( (username, password, cb) => {
    process.nextTick(() => {
      connection.connect();
      connection.query(`SELECT name FROM user WHERE name=${username}`, (err, rows, fields) => {
        if (err) throw err;
        console.log('MYSQL:user table created');
    });
  });
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

const server = express();

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
//static files
server.use(express.static(process.env.NODE_PATH + '/public')); //TODO add favicon, robots, etc.
//api routes
server.use('/api', api);






server.get('*', async (req, res, next) => {
  try {
    const html = ReactDOMServer.renderToString(<Html />);
    res.send('<!DOCTYPE HTML>\n' + html);
  } catch (err) {
    next(err);
  }
});

server.listen(port, () => {
  console.log('server listening on %d!', port);
});