const apiKey = "4c48092a7533dfb7b0dadff2c704aa84";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherBox = document.getElementById("weatherBox");
const errorMsg = document.getElementById("errorMsg");

async function checkWeather(city) {
  if (!city.trim()) return;

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      errorMsg.style.display = "block";
      weatherBox.style.display = "none";
      return;
    }

    const data = await response.json();

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("condition").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    document.getElementById("wind").textContent = data.wind.speed + " km/h";

    weatherBox.style.display = "block";
    errorMsg.style.display = "none";
  } catch (err) {
    console.error("Error fetching weather data:", err);
    errorMsg.style.display = "block";
    weatherBox.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(cityInput.value);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(cityInput.value);
  }
});
