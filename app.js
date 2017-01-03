const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')
const API_key = '8cd64dd1afcd2a42e4b270ca0709eecf';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true
    }
  })
  .help()
  .argv;

geocode.getGeocode(argv.a, (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Address: ${results.address}`);
    weather.getWeather(API_key, results.latitude, results.longitude, (err, weatherResults) => {
      if (err) {
        console.log(err, 'this is an error');
      } else if (weatherResults) {
        console.log(`It's currently ${temp} degrees. It feels like ${apparentTemp}`);
      }
    });
  }
});
