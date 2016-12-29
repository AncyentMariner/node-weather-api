const request = require('request');

function getWeather(API_key, lat, lng, callback) {
  request({
    url: `https://api.darksky.net/forecast/${API_key}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temp: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      });
    } else {
      callback('There was an error connecting to API');
    }
  });
}

module.exports.getWeather = getWeather;
