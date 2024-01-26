const urlWeather = 'https://api.open-meteo.com/v1/forecast';

const params = [
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'precipitation_hours',
  'precipitation_probability_max',
  'wind_speed_10m_max',
];
async function getWeatherData(lat = 52.52, lon = 13.4, days = 14) {
  try {
    const response = await fetch(
      `${urlWeather}?latitude=${lat}&longitude=${lon}&daily=${params.join()}&forecast_days=${days}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getWeatherData,
};
