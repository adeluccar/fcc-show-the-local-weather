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

function displayLocation(data) {
  getMyElement('app__location').innerHTML = data.timezone;
  return data;
}

function displayTemperature(data) {
  getMyElement('app__temperature').innerHTML = `${Math.round(data.currently.temperature)}º`;
  return data;
}

function displayAppIcon(data) {
  getMyElement('app__icon').src = `img/${data.currently.icon}.svg`;
  return data;
}

function displaySummary(data) {
  getMyElement('app__summary').innerHTML = data.currently.summary;
  return data;
}

function displayWeather(data) {
  displayLocation(data);
  displayTemperature(data);
  displayAppIcon(data);
  displaySummary(data);
}

fetch(url)
  .then(resp => resp.json())
  .then(data => displayWeather(data))
  .catch(error => console.log(error));
