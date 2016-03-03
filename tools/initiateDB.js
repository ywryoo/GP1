/**
 * Created by Yangwook Ryoo on 2/3/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 //this tests db setting is right - DB 연결 테스트 파일
import mysql from 'mysql';
import * as db from '../src/constants/db.js';

//put user credit into mysql
const connection = mysql.createConnection(db.config);

//connect
connection.connect();

/**
 * TABLE user
 * id(int) name(string) pass(string) date(datetime) level(int)
 */
connection.query('CREATE TABLE user (\
  id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
  name VARCHAR(50),\
  pass VARCHAR(255),\
  date DATETIME,\
  level INT(10));', (err, rows, fields) => {
    if (err) throw err;
    console.log('MYSQL:user table created');
});

//end connection
connection.end();

//TODO make db script
