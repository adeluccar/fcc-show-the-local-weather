import 'normalize.css';
import style from './app.css';

require.context('./img');

const proxy = 'https://fcc-climate-proxy.herokuapp.com';
const lat = '10.500000';
const lon = '-66.916664';
const url = `${proxy}/?lat=${lat}&lon=${lon}`;

function getMyElement(className) {
  const arry = document.getElementsByClassName(className);
  const element = arry.item(0);
  return element;
}

function parseForecast(data) {
  const obj = {};
  obj.icon = data.currently.icon;
  obj.summary = data.currently.summary;
  obj.temperature = `${Math.round(data.currently.temperature)}º`;
  obj.location = data.timezone;
  return obj;
}

function displayElement(obj, prop) {
  prop === 'icon'
    ? getMyElement(`app__${prop}`).src = `img/${obj[prop]}.svg`
    : getMyElement(`app__${prop}`).innerHTML = obj[prop];
  return obj;
}

function displayWeather(obj) {
  displayElement(obj, 'icon');
  displayElement(obj, 'summary');
  displayElement(obj, 'temperature');
  displayElement(obj, 'location');
}

function toCelsius(num) {
  return (((num - 32) * 5) / 9);
}

// fetch(url)
//   .then(resp => resp.json())
//   .then(data => displayWeather(parseForecast(data)))
//   .catch(error => console.log(error))

const mockdata = '{"latitude":10.480594,"longitude":-66.903606,"timezone":"America/Caracas","offset":-4,"currently":{"time":1501607253,"summary":"Drizzle","icon":"rain","precipIntensity":0.033,"precipProbability":0.34,"precipType":"rain","temperature":77.15,"apparentTemperature":78.1,"dewPoint":68.71,"humidity":0.75,"windSpeed":4.16,"windGust":6.29,"windBearing":52,"cloudCover":0.47,"pressure":1014.16,"ozone":274.32,"uvIndex":11}}';

displayWeather(parseForecast(JSON.parse(mockdata)));

