const { getWeatherData } = require('../apiService');
const { addPerson } = require('../models/dbCalls');

async function getWeatherForecast(req, res) {
  try {
    const forecast = await getWeatherData(51, 13, 14);
    res.status(200);
    res.send(forecast.daily);
  } catch (e) {
    console.log('e', e);
    res.sendStatus(500);
  }
}

async function addPersonForForecast(req, res) {
  try {
    const lastID = await addPerson(req.body);

    res.json({ message: 'Subscription successful' });

    res.status(200);
  } catch (e) {
    res.json({ message: e.message });

    res.status(500);
  }
}

async function getPersonsForForecast() {
  try {
    const persons = await getPersons();
    return persons;
  } catch (e) {
    console.error('Error:', e.message);
    res.status(500).send(e.message);
  }
}

module.exports = {
  getWeatherForecast,
  addPersonForForecast,
};
