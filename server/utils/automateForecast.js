const schedule = require('node-schedule');
const {
  getPersons,
  deletePersons,
  decrementDays,
  deletePersonsByEmail,
} = require('../models/dbCalls');
const { getWeatherData } = require('../apiService');

const { sendEmails } = require('./email');

async function scheduleSendEmail() {
  schedule.scheduleJob('30 9 * * *', async function () {
    const rows = await getPersons();
    const forecastArr = [];
    let forecast;

    //on email subscriptions get the forecast
    if (rows.length > 0) {
      for (const row of rows) {
        let forecast = await getWeatherData(row.lat, row.lon);

        //for the last 4 days of the forecast change null probability to some custom proxy rules based on forecasted percipitation time

        forecast.daily.precipitation_probability_max =
          forecast.daily.precipitation_probability_max.map((day, index) => {
            if (day) return day;

            if (forecast.daily.precipitation_hours[index] <= 2) {
              return 10;
            } else if (
              forecast.daily.precipitation_hours[index] > 2 &&
              forecast.daily.precipitation_hours[index] <= 5
            ) {
              return 10;
            } else if (
              forecast.daily.precipitation_hours[index] > 5 &&
              forecast.daily.precipitation_hours[index] <= 8
            ) {
              return 30;
            } else if (
              forecast.daily.precipitation_hours[index] > 8 &&
              forecast.daily.precipitation_hours[index] <= 12
            ) {
              return 40;
            } else if (
              forecast.daily.precipitation_hours[index] > 12 &&
              forecast.daily.precipitation_hours[index] <= 15
            ) {
              return 55;
            } else if (
              forecast.daily.precipitation_hours[index] > 15 &&
              forecast.daily.precipitation_hours[index] <= 18
            ) {
              return 70;
            } else if (forecast.daily.precipitation_hours[index] > 18) {
              return 85;
            }
          });

        forecastArr.push(forecast);
      }

      let emailsToSend = rows.map((row, index) => {
        return sendEmails(row.name, row.email, forecastArr[index].daily);
      });
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
