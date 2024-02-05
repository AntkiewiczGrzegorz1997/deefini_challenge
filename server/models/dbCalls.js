const db = require('./db.js');

function addPerson(body) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO persons (name, email, days, lat, lon) VALUES (?, ?, ?, ?, ?)`,
      [body.name, body.email, body.days, body.lat, body.lon],
      function (err) {
        if (err) {
          if (err.message && err.message.includes('UNIQUE constraint failed')) {
            reject(
              new Error('Error: The email already exists in the database.')
            );
          } else {
            reject(new Error(err.message));
          }
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
          resolve(this.lastID);
        }
      }
    );
  });
}

function getPersons() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM persons`, [], function (err, rows) {
      if (err) {
        reject(new Error(err.message));
      } else {
        rows.forEach((row) => {
          console.log(row);
        });
        resolve(rows);
      }
    });
  });
}

function deletePersons(personIds) {
  return new Promise((resolve, reject) => {
    const placeholders = personIds.map(() => '?').join(',');
    console.log(placeholders);
    const query = `DELETE FROM persons WHERE id IN (${placeholders})`;

    db.run(query, personIds, function (err) {
      if (err) {
        reject(new Error(err.message));
      } else {
        console.log(`Row(s) deleted ${this.changes}`);
        resolve(this.changes);
      }
    });
  });
}

function deletePersonsByEmail(personEmails) {
  return new Promise((resolve, reject) => {
    // Create a string of placeholders equal to the length of personEmails array
    const placeholders = personEmails.map(() => '?').join(',');
    const query = `DELETE FROM persons WHERE email IN (${placeholders})`;

    db.run(query, personEmails, function (err) {
      if (err) {
        reject(new Error(err.message));
      } else {
        console.log(`Row(s) deleted ${this.changes}`);
        resolve(this.changes); // 'this.changes' will return the number of rows deleted
      }
    });
  });
}

function decrementDays() {
  return new Promise((resolve, reject) => {
    db.run(`UPDATE persons SET days = days - 1`, function (err) {
      if (err) {
        reject(new Error(err.message));
      } else {
        console.log(`Row(s) updated ${this.changes}`);
        resolve(this.changes);
      }
    });
  });
}

module.exports = {
  addPerson,
  getPersons,
  deletePersons,
  decrementDays,
  deletePersonsByEmail,
};
