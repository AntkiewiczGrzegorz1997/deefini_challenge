const nodemailer = require('nodemailer');
require('dotenv').config();

let config = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(config);

function createHTML(weatherData, name) {
  let htmlContent = `<p>Dear ${name}, <br>
  Please find the 14 day Weather Forecast in the following email.
  </p><div style="display: flex; flex-wrap: wrap; gap: 0.5vw">`;

  for (let i = 0; i < weatherData.time.length; i++) {
    htmlContent += `
          <div style="flex: 1 0 13.5%; padding: 10px; box-sizing: border-box;">
              <h3 style="color: #07d49b;">${weatherData.time[i]}</h3>
              <p>Max Temp.: ${weatherData.temperature_2m_max[i]} °C</p>
              <p>Min Temp.: ${weatherData.temperature_2m_min[i]} °C</p>
              <p>Precipitation: ${weatherData.precipitation_sum[i]} mm</p>
              <p>Precipitation Hrs.: ${weatherData.precipitation_hours[i]}</p>
              <p>Precipitation Prb.: ${weatherData.precipitation_probability_max[i]}%</p>
              <p>Max Wind Speed: ${weatherData.wind_speed_10m_max[i]} km/h</p>
          </div>`;
  }

  htmlContent +=
    `</div>` +
    `<p>Best regards, <br> 
  Your Weatherbot
  </p>`;
  return htmlContent;
}

function sendEmails(name, email, weatherData) {
  return new Promise((resolve, reject) => {
    let createHTMLContent = createHTML(weatherData, name);

    let message = {
      from: 'challengedeefinity@gmail.com',
      to: email,
      subject: 'DAILY FORECAST',
      html: createHTMLContent,
    };

    transporter
      .sendMail(message)
      .then((info) => {
        console.log('Email sent to:', email);
        resolve({ success: true, email: email });
      })
      .catch((err) => {
        console.error('Error sending email to:', email, '; Error:', err);
        resolve({ success: false, email: email });
      });
  });
}

module.exports = {
  sendEmails,
};
