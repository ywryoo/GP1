/**
 * Created by Yangwook Ryoo on 3/11/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Router} from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const router = new Router();

//must be hidden
let secretkey = "Monkey LIKES banana!!";

// XXX: This should be a database of users :).
let users = [{
  id: 1,
  username: 'monkey',
  password: 'banana'
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), secretkey, { expiresIn: 60*60*5 });
}

function getUserScheme(req) {

  let username;
  let type;
  let userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

router.post('/users', function(req, res) {

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  if (_.find(users, userScheme.userSearch)) {
   return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile)
  });
});

router.post('/sessions/create', function(req, res) {

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, userScheme.userSearch);

  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});

export {router as default};