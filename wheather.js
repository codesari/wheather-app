// const getCoords = async () => {
//   let response = await fetch(url);
//   let data = await response.json();
//   return data;
// };

// getCoords()
//   .then((res) => {
//     lat = res[0].lat;
//     lon = res[0].lon;
//     console.log(lat, lon);
//   })
//   .then();

// const getWheather = async () => {
//   let secondURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
//   let response = await fetch(secondURL);
//   let data = await response.json();
//   return data;
// };

// getWheather().then((res) => console.log(res));

let apiKey = "c596300e44a2dbdfa3b87cda29ff8d7b";
let city = "Istanbul";
let url = `

https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const getCity = async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      printErrorToDOM();
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    console.log(data);
    getWeather(data);
  } catch (err) {
    console.log(err);
  }
};

const printErrorToDOM = () => {
  let errorDiv = document.getElementById("error");
  errorDiv.innerHTML += `<img src="./img/404notfound.png" alt="">
  `;
};

getCity();

const getWeather = (data) => {
  const {
    name,
    sys: { country },
    main: { temp },
    weather,
  } = data;
  // console.log(data.name); //! City name
  console.log(name);
  console.log(country);
  console.log(temp);
  console.log(weather[0].icon);
  console.log(weather[0].description);
};
