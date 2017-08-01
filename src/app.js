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

function setWeatherData(data) {
  const now = data.currently;

  const appLocation = getMyElement('app__location');
  appLocation.innerHTML = data.timezone;

  const appTemperature = getMyElement('app__temperature');
  appTemperature.innerHTML = `${Math.round(now.temperature)}º`;

  const appIcon = getMyElement('app__icon');
  appIcon.src = `img/${now.icon}.svg`;

  const appSummary = getMyElement('app__summary');
  appSummary.innerHTML = now.summary;
}

fetch(url)
  .then(resp => resp.json())
  .then(data => setWeatherData(data))
  .catch(error => console.log(error));
