const url = 'http://localhost:3000';

export async function subscribeToWeatherForecast(subscriberData) {
  try {
    const response = await fetch(`${url}/addPersonForForecast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    const data = await response.json();
    alert(data.message);
    return data;
  } catch (e) {
    alert(e.message);
  }
}
