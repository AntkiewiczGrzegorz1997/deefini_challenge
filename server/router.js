'use strict';
//Imports
const router = require('express').Router();

const {
  getWeatherForecast,
  addPersonForForecast,
} = require('./controllers/forecastController');

//Routes
router.get('/weatherForecast', getWeatherForecast);
router.post('/addPersonForForecast', addPersonForForecast);

// Exports
module.exports = router;
