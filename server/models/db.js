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

// Insert data
// db.run(
//   `INSERT INTO persons (name, email, days) VALUES (?, ?, ?)`,
//   ['Grzegorz', 'gantkiewicz97@gmail.com', 14],
//   function (err) {
// if (err.message.includes('UNIQUE constraint failed')) {
//   console.error('Error: The email already exists in the database.');
// } else {
//   console.error(err.message);
// }
//     // get the last insert id
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
//   }
// );

// Query data
db.all(`SELECT * FROM persons`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

// // Close the database connection
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
module.exports = db;
