/**
 * Created by Yangwook Ryoo on 2/2/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import plan from 'flightplan';

const appName = "IWYTS";
const host = "-";
const username = 'ubuntu';
const key = "-";    //edit for your key

let state = "staging";

// configuration
plan.target('server', [
  {
    host: host,
    username: username,
    privateKey: key
  }
]);

function localTask(local) {
  state = 'staging';
  local.log('Run gulp to build');
  local.exec('gulp start');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('find . -name "package.json" -maxdepth 1 && find ./dist -type f -not -path "./dist/coverage/*"', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + appName);
}

function localTaskp(local) {
  state = 'production';
  local.log('Run gulp to build');
  local.exec('gulp startProduction');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('find . -name "package.json" -maxdepth 1 && find ./dist -type f -not -path "./dist/coverage/*"', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + appName);
}//TODO remove .map


function remoteTask(remote) {
  remote.log('Move folder to webroot');
  remote.exec('rm -rf /var/www/' + state + '/' + appName);
  remote.exec('cp -R /tmp/' + appName + ' /var/www/' + state + '/' + appName);
  remote.exec('rm -rf /tmp/' + appName);
  remote.exec('echo \' {\
  "apps" : [\
    {\
      "name"      : "' + appName + '_' + state + '",\
      "script"    : "/var/www/' + state + '/' + appName + '/dist/server.js",\
      "env": {\
        "COMMON_VARIABLE": "true"\
      },\
      "env_production" : {\
        "NODE_ENV": "production",\
        "NODE_PATH": "/var/www/production/' + appName + '/dist"\
      },\
      "env_staging" : {\
        "NODE_ENV": "staging",\
        "NODE_PATH": "/var/www/staging/' + appName + '/dist"\
      }\
    }\
  ]}\' >> /var/www/' + state + '/' + appName + '/ecosystem.json');
  //remote.exec('ln -snf /var/www/' + state + '/' + appName + ' /var/www/' + state + '/' + appName);

  remote.log('Reload application');
  remote.exec('. ~/.nvm/nvm.sh  && ' +
    'nvm use 4.3.1 && ' +
    'cd /var/www/' + state + '/' + appName + ' && ' +
    'npm install --production && ' +
    'pm2 startOrReload /var/www/' + state + '/' + appName + '/ecosystem.json --env ' + state);
}

plan.local(localTask);
plan.remote(remoteTask);

plan.local('production', localTaskp); //TODO need to find way to reuse localTask
plan.remote('production', remoteTask);
