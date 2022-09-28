let lat;
let lon;
let API_KEY = "c596300e44a2dbdfa3b87cda29ff8d7b";
let cityName = "London";

let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

const getCoords = async () => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

getCoords()
  .then((res) => {
    lat = res[0].lat;
    lon = res[0].lon;
    console.log(lat, lon);
  })
  .then();

const getWheather = async () => {
  let secondURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  let response = await fetch(secondURL);
  let data = await response.json();
  return data;
};

getWheather().then((res) => console.log(res));

// res[0].lat;
