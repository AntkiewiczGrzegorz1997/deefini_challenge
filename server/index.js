'use strict';
const router = require('./router.js');
const express = require('express');
const cors = require('cors');
const db = require('./models/db.js');
const { scheduleSendEmail } = require('./utils/automateForecast.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(router);

(async function bootstrap() {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  await scheduleSendEmail();
})();

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(
        'Error closing the SQLite database connection:',
        err.message
      );
    } else {
      console.log('SQLite database connection closed.');
    }
    process.exit(0);
  });
});
