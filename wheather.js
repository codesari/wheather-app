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

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  const input = document.getElementById("input");
  if (input.value.trim() == "") {
    alert("enter a string please");
  } else {
    const accessAPI = async () => {
      let city = input.value;
      let apiKey = "c596300e44a2dbdfa3b87cda29ff8d7b";

      let url = `

https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
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
    accessAPI();
  }
});

const printErrorToDOM = () => {
  let errorDiv = document.getElementById("error");
  errorDiv.innerHTML += `<img src="./img/404notfound.png" alt="">
  `;
};

const getWeather = (data) => {
  const {
    name,
    sys: { country },
    main: { temp },
    weather,
  } = data;

  let kelvin = "273.15";
  let newTemp = Math.floor(temp - kelvin);

  const container = document.getElementById("container");
  container.innerHTML += `
      <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="card" style="width: 18rem">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${name}<span>${country}</span> </li>
            <li class="list-group-item">${newTemp}</li>
            <li class="list-group-item"><i>${weather[0].icon}</i></li>
            <li class="list-group-item">${weather[0].description}</li>
          </ul>
        </div>
      </div>
    

  
  `;
  // console.log(newTemp);
  // console.log(name);
  // console.log(country);
  // console.log(temp);
  // console.log(weather[0].icon);
  // console.log(weather[0].description);
};
