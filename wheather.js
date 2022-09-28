const btn = document.getElementById("btn");
let arrCity = [];

btn.addEventListener("click", () => {
  const input = document.getElementById("input");
  if (input.value.trim() == "") {
    alert("enter a string please");
  } else {
    const accessAPI = async () => {
      try {
        let city = input.value;

        if (arrCity.includes(city)) {
          alert("Enter a different city,please..");
          throw new Error();
        }

        let apiKey = "c596300e44a2dbdfa3b87cda29ff8d7b";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) {
          printErrorToDOM();
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        console.log(data);
        arrCity.push(city);
        console.log(arrCity);
        getWeather(data);
      } catch (err) {
        console.log(err);
      }
    };
    accessAPI();
  }
});

const printErrorToDOM = () => {
  // let errorDiv = document.getElementById("error");
  // errorDiv.innerHTML += `<img src="./img/404notfound.png" alt="">
  // `;
  alert("This city is not found..");
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
  let iconCode = weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const container = document.getElementById("container");
  container.innerHTML += `
      <div class="col-md-6 col-lg-4 col-xl-3">
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${name}<span>${country}</span></h5>
        <p class="card-text" id="temp">${newTemp}<span>℃</span></p>
        <p class="card-text"><img src="${iconURL}" /></p>
        <p class="card-text" id="weather-condition">${weather[0].description.toUpperCase()}</p>
        
        
      </div>
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
