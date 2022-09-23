let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let monthes = [
  "January",
  "Fabruary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = monthes[now.getMonth()];
let minutes = `${now.getMinutes()}`.padStart(2, 0);
let currentDate = `${day}, ${now.getHours()}:${minutes}`;
let date = document.querySelector("#date");
date.innerHTML = currentDate;
let apiKey = "ed11d1043f1c6f1f2bbba5333d9da6cd";
let apiUrlKyiv = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
function tempKyiv(response) {
  let tempc = document.querySelector("#tempc");
  console.log(response);
  let tempKyiv = Math.round(response.data.main.temp);
  let descKyivNow = response.data.weather[0].main;
  let descKyiv = document.querySelector("#descKyiv");
  console.log(tempKyiv);
  tempc.innerHTML = `${tempKyiv}`;
  descKyiv.innerHTML = `${descKyivNow}`;

  let windKyiv = response.data.wind.speed;
  let speed = document.querySelector("#speed");
  speed.innerHTML = `${windKyiv} `;
  let humKyiv = response.data.main.humidity;
  let hum = document.querySelector("#hum");
  hum.innerHTML = `${humKyiv}%`;
}
axios.get(apiUrlKyiv).then(tempKyiv);

//function farShow(event) {
//event.preventDefault();
//let temp = document.querySelector("#tempc");
//let tempF = (temp * 9) / 5 + 32;
//console.log(tempF);
//temp.innerHTML = tempF;
//}
//console.log(tempF);

//let faren = document.querySelector("#faren");
//faren.addEventListener("click", farShow);

//function celShow(event) {
//event.preventDefault();
//let temp = document.querySelector("#tempc");
//let tempC = `33℃`;

//temp.innerHTML = tempC;
//}
//console.log(tempF);
//console.log(tempF);
//let cel = document.querySelector("#cel");
//cel.addEventListener("click", celShow);
function showCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#inputCity");
  let city = document.querySelector("#city");
  if (newCity.value) {
    city.innerHTML = newCity.value;
  } else {
  }
  console.log(newCity.value);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  console.log(apiUrl);
}

let buttonSearch = document.querySelector("#search");
buttonSearch.addEventListener("click", showCity);

//let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`
//axios.get(url).then(showTemp);
// console.log(apiUrl);
function showTemp(response) {
  console.log(response);
  let tempC = Math.round(response.data.main.temp);
  console.log(tempC);
  let description = response.data.weather[0].main;
  console.log(description);
  let tempNow = document.querySelector("#now");
  let windSpeed = response.data.wind.speed;
  console.log(windSpeed);
  let speed = document.querySelector("#speed");
  let humNew = response.data.main.humidity;
  console.log(humNew);
  let hum = document.querySelector("#hum");
  tempNow.innerHTML = `🌡 ${tempC}℃ ... ${description}`;
  speed.innerHTML = `${windSpeed} `;
  hum.innerHTML = `${humNew}%`;
}

function currentPosition(position) {
  console.log("currentPosition");
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url2).then(function (response) {
    let geoCity = response.data.name;
    console.log(url2);
    console.log(response);
    console.log(geoCity);
    let tempC = Math.round(response.data.main.temp);
    console.log(tempC);
    let description = response.data.weather[0].main;
    console.log(description);
    let tempNow = document.querySelector("#now");
    let windSpeed = response.data.wind.speed;
    console.log(windSpeed);
    let speed = document.querySelector("#speed");
    let humNew = response.data.main.humidity;
    console.log(humNew);
    let hum = document.querySelector("#hum");
    tempNow.innerHTML = `🌡 ${tempC}℃ ... ${description}`;
    speed.innerHTML = `${windSpeed} `;
    hum.innerHTML = `${humNew}%`;
    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = `${response.data.name} <i class="fa-solid fa-location-dot"></i>`;
  });
}

function geoLoc() {
  console.log("geoLoc");
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function start(event) {
  event.preventDefault();
  console.log("start");
  geoLoc();
}

let buttonCurrent = document.querySelector("#current");
console.log(buttonCurrent);
buttonCurrent.addEventListener("click", start);
