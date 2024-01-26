const schedule = require('node-schedule');
const {
  getPersons,
  deletePersons,
  decrementDays,
  deletePersonsByEmail,
} = require('./models/dbCalls');
const { getWeatherData } = require('./apiService');

const { sendEmails } = require('./email');

async function scheduleSendEmail() {
  schedule.scheduleJob('* * * * *', async function () {
    const rows = await getPersons();

    //on email subscriptions get the forecast
    if (rows.length > 0) {
      //for simplicity I assume all of the forecasts are in berlin and actually and I always choose a forecast for 14 days to be showed
      const forecast = await getWeatherData();

      let emailsToSend = rows.map((row) =>
        sendEmails(row.name, row.email, forecast.daily)
      );
      //check and delete failed emails
      let results = await Promise.all(emailsToSend);
      let failedEmails = results
        .filter((result) => !result.success)
        .map((result) => result.email);

      await deletePersonsByEmail(failedEmails);

      rows.forEach((row) => {
        row.days--;
      });

      const rowsToDelete = rows
        .filter((row) => row.days <= 0)
        .map((row) => row.id);

      await decrementDays();

      const deletedRows = await deletePersons(rowsToDelete);
    }
  });
}

module.exports = { scheduleSendEmail };
