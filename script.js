// Put API Key
const apiKey = '#';

// getDataForCity function fetches weather info from openweathermap API
const getDataForCity = city => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json());

// createCardHtml function used to render the weather info as a card
const createCardHtml = (name, emoji, temp, feelsLike, description) => `
  <div class="card">
    <div class="row no-gutters align-items-center">    
      <div class="col-2 h2 pl-1 pt-1 text-center">                
        ${emoji}
      </div>
      <div class="col-10">
        <div class="card-body">
          <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
            <h4>${name}</h4>
            <h6>${temp}°C, it feels like ${feelsLike}°C</h6>
          </div>
          <div class="row">
            <h5 class="card-subtitle text-muted">${description}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// emojis object used to find the right emoji from the icon code sent from the API
const emojis = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌦',
    '11d': '⛈',
    '13d': '❄️',
    '50d': '💨',
    '01n': '☀️',
    '02n': '⛅️',
    '03n': '☁️',
    '04n': '☁️',
    '09n': '🌧',
    '10n': '🌦',
    '11n': '⛈',
    '13n': '❄️',
    '50n': '💨',
};

// select required items
const searchButton = document.querySelector("#searchbtn");
const locationInput = document.querySelector("#location");
const weatherC = document.querySelector("#weather");

// event listener for a click event on the "search" button
searchButton.addEventListener('click', () => {



    // get the city from the input field
    const city = locationInput.value;

    // get the weather data for the city
    getDataForCity(city)
        .then(data => {
            // get the data we need for our html from the response
            const name = data.name;
            const emoji = emojis[data.weather[0].icon];
            const temp = data.main.temp;
            const feelsLike = data.main.feels_like;
            const description = data.weather[0].description;

            // create the card html
            const cardHtml = createCardHtml(name, emoji, temp, feelsLike, description);

            // render!
            weatherC.innerHTML = cardHtml;
        });
});