const Database = require('arangojs').Database;

db = new Database();
db.createDatabase('owdb').then(
  () => console.log('Database created'),
  err => console.error('Failed to create database:', err)
);
 

