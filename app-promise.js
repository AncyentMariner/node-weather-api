const yargs = require('yargs');
const axios = require('axios');
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

let encodedAddress = encodeURIComponent(argv.address);
let encodedUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(encodedUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.')
  }

  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;;
  let weatherUrl = `https://api.darksky.net/forecast/${API_key}/${lat},${lng}`;

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  let temp = response.data.currently.temperature;
  let apparentTemp = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temp} degrees. It feels like ${apparentTemp}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log(e);
  } else {
    console.log(e.message);
  }
});
