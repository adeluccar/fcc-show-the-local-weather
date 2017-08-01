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
  return {
    icon: data.currently.icon,
    summary: data.currently.summary,
    temperature: `${Math.round(data.currently.temperature)}º`,
    location: data.timezone,
  };
}

function displayElement(obj, prop) {
  prop === 'icon' //eslint-disable-line
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
  return Math.round((((num - 32) * 5) / 9));
}

function toFahrenheit(num) {
  return Math.round((((num * 9) / 5) + 32));
}

function convertUnits() {
  const button = document.querySelector('#button');

  if (button.classList.contains('is-fahrenheit')) {
    getMyElement('app__temperature').innerHTML = `${toCelsius(getMyElement('app__temperature').innerHTML.slice(0, -1))}º`;
    button.classList.remove('is-fahrenheit');
    button.classList.add('is-celsius');
    button.src = 'img/celsius.svg';
  } else {
    getMyElement('app__temperature').innerHTML = `${toFahrenheit(getMyElement('app__temperature').innerHTML.slice(0, -1))}º`;
    button.classList.remove('is-celsius');
    button.classList.add('is-fahrenheit');
    button.src = 'img/fahrenheit.svg';
  }
}

document.querySelector('#button').addEventListener('click', convertUnits);

// fetch(url)
//   .then(resp => resp.json())
//   .then(data => displayWeather(parseForecast(data)))
//   .catch(error => console.log(error))

const mockdata = '{"latitude":10.480594,"longitude":-66.903606,"timezone":"America/Caracas","offset":-4,"currently":{"time":1501607253,"summary":"Drizzle","icon":"rain","precipIntensity":0.033,"precipProbability":0.34,"precipType":"rain","temperature":77.15,"apparentTemperature":78.1,"dewPoint":68.71,"humidity":0.75,"windSpeed":4.16,"windGust":6.29,"windBearing":52,"cloudCover":0.47,"pressure":1014.16,"ozone":274.32,"uvIndex":11}}';

displayWeather(parseForecast(JSON.parse(mockdata)));
