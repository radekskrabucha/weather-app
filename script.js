const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search');
const localizeBtn = document.getElementById('localization');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const temperatureFeels = document.getElementById('temperature-feels');
const icon = document.getElementById('icon');
const description = document.getElementById('description');
const wind = document.getElementById('wind');
const windArrow = document.getElementById('arrow');
const humidity = document.getElementById('humidity');
const infoSection = document.getElementById('info-section');
const temperatureSection = document.getElementById('temperature-section');

function getWeatherData(data) {
   return {
      name: data.name,
      temp: Math.floor(data.main.temp),
      feelsTemp: Math.floor(data.main.feels_like),
      humidity: data.main.humidity,
      wind: {
         deg: data.wind.deg,
         speed: Math.floor(data.wind.speed)
      },
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      iconUrl: '',
      country: data.sys.country
   }
}

async function getWeatherBySearch(city) {
   const API_KEY = '6d3afeb2b6e8826f23989b6a11f4d015';
   let query = city;
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${API_KEY}`;

   const response = await fetch(url, {mode: 'cors'});
   const data = await response.json();
   const imgUrl = await fetch(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
   const cityWeather = getWeatherData(data);
   cityWeather.iconUrl = imgUrl.url;
   return cityWeather;
}
searchForm.addEventListener('submit', (e) => {
   e.preventDefault();
   getWeatherBySearch(e.target.search.value)
      .then(response => {
         cityName.textContent = response.name;
         let country = document.createElement('sup');
         country.textContent = response.country;
         country.setAttribute('id', 'country');
         country.classList.add('sup');
         cityName.appendChild(country);
         temperature.textContent = response.temp;
         temperatureFeels.textContent = `feels like: ${response.feelsTemp}`;
         icon.src = response.iconUrl;
         description.textContent = response.description;
         wind.textContent = `wind: ${response.wind.speed} km/h`;
         humidity.textContent = `humidity: ${response.humidity}%`;
         windArrow.style.transform = `rotate(${response.wind.deg}deg)`;
         infoSection.style.display = 'flex';
         temperatureSection.style.display = 'flex';
      })
   e.target.reset();
})

