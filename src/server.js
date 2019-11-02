const Database = require('arangojs').Database;

const db = new Database();
db.useBasicAuth('root', 'openSesame')
console.log('db', db);

db.createDatabase('orb_weaver_db').then(
  () => console.log('Database created'),
  err => console.error('Failed to create database:', err)
);
 

