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

function forecast(data) {
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

fetch(url)
  .then(resp => resp.json())
  .then(data => displayWeather(forecast(data)))
  .catch(error => console.log(error))
