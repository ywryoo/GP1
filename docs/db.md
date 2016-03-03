you need to make src/constants/db.js with following data.

```
export const config = {
  host     : 'localhost',
    user     : '',
  password : '',
  database : ''
}
```

CREATE DB and user

```
create database DB명 default character set utf8;
create user 유저명@localhost identified by '비밀번호';
grant all privileges on DB명.* to 유저명@localhost identified by '비밀번호';
```
