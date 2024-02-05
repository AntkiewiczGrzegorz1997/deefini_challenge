const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./mydb.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the mydb.sqlite database.');
});

// Create a table
db.run(
  `CREATE TABLE IF NOT EXISTS persons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  days INTEGER,
  lat REAL,
  lon REAL
)`,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Table already created');
    }
  }
);

module.exports = db;
