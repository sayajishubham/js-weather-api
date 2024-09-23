let locations = document.querySelector(".locations")
const send = document.getElementById('sub');
let currD = 0;
let info = [];

fetch("http://localhost:3000/bulk")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    info = data;
    check(info[currD]); 
  })
  .catch((err) => {
    console.log("Error:", err);
  });


send.addEventListener('click', () => {
  currD = (currD + 1) % info.length; 
  check(info[currD]); 
});

function check(info) {
  const pros = `
    <div class="location">
        <h2 class="name">${info.query.location.name}</h2>
        <p class="temp">${info.query.current.temp_c}°C / ${info.query.current.temp_f}°F</p>
        <p class="condition">${info.query.current.condition.text}</p>
        <p class="wind">Wind: ${info.query.current.wind_mph} mph / ${info.query.current.wind_kph} kph</p>
        <p class="humidity">Humidity: ${info.query.current.humidity}%</p>
        <p class="feelslike">Feels like: ${info.query.current.feelslike_c}°C / ${info.query.current.feelslike_f}°F</p>
        <p class="visibility">Visibility: ${info.query.current.vis_km} km / ${info.query.current.vis_miles} miles</p>
        <p class="uv">UV: ${info.query.current.uv}</p>
        <p class="gust">Gust: ${info.query.current.gust_mph} mph / ${info.query.current.gust_kph} kph</p>
    </div>
  `;
  locations.innerHTML += pros; 
}