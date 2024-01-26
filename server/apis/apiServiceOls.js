const { fetchWeatherApi } = require('openmeteo');

const params = {
  latitude: 52.52, // Berlin coordinates
  longitude: 13.41,
  daily: [
    'temperature_2m_max',
    'temperature_2m_min',
    'precipitation_sum',
    'precipitation_hours',
    'precipitation_probability_max',
    'wind_speed_10m_max',
  ],
  forecast_days: 14,
};

const url = 'https://api.open-meteo.com/v1/forecast';

async function getWeatherData(params, url) {
  try {
    const responses = await fetchWeatherApi(url, params);
    return responses;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

const responses = getWeatherData(params, url).then((responses) => {
  const response = responses[0];
  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();
  const daily = response.daily();
});

console.log('hohoho', responses);

// Helper function to form time ranges
// const range = (start, stop, step) =>
//   Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// // Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0];

// // Attributes for timezone and location
// const utcOffsetSeconds = response.utcOffsetSeconds();
// const timezone = response.timezone();
// const timezoneAbbreviation = response.timezoneAbbreviation();
// const latitude = response.latitude();
// const longitude = response.longitude();

// const daily = response.daily();

// // Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  daily: {
    time: range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    temperature2mMax: daily.variables(0).valuesArray(),
    temperature2mMin: daily.variables(1).valuesArray(),
    precipitationSum: daily.variables(2).valuesArray(),
    precipitationHours: daily.variables(3).valuesArray(),
    precipitationProbabilityMax: daily.variables(4).valuesArray(),
    windSpeed10mMax: daily.variables(5).valuesArray(),
  },
};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
// for (let i = 0; i < weatherData.daily.time.length; i++) {
//   console.log(
//     weatherData.daily.time[i].toISOString(),
//     weatherData.daily.temperature2mMax[i],
//     weatherData.daily.temperature2mMin[i],
//     weatherData.daily.precipitationSum[i],
//     weatherData.daily.precipitationHours[i],
//     weatherData.daily.precipitationProbabilityMax[i],
//     weatherData.daily.windSpeed10mMax[i]
//   );
// }
