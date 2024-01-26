// Imports
'use strict';
const router = require('./router.js');
const express = require('express');
const cors = require('cors');
const db = require('./models/db.js');
const { scheduleSendEmail } = require('./automateForecast.js');

//no model yet
//const { main } = require('./models/db.js');

const app = express();

const PORT = 3003;

//app.use(express.static(conf.clientPath));
app.use(express.json());
app.use(cors());
app.use(router);

//Launch with IFFY
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
