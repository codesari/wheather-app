const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // ! prevent Default yapilmazsa ,card yapisi gelmiyor !!!
  // ! cünkü submit dedigimde default olarak post işlemi yoksa hiçbirşey yapmaz,bu yüzden ben kendi fonksiyonumu cagiramam.form un bu özelligini durdurup kendi fonksiyonumuzu cagiriyoruz..
  const input = document.getElementById("input");
  if (input.value.trim() == "") {
    alert("enter a city please");
  } else {
    try {
      const accessAPI = async () => {
        let city = input.value;
        let arrCity = [];

        if (arrCity.includes(city)) {
          printErrorToDOM("Enter a different city,please..");
          throw new Error();
        }

        let apiKey = "c596300e44a2dbdfa3b87cda29ff8d7b";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const res = await fetch(url);
        if (!res.ok) {
          printErrorToDOM("City is not founded");
          throw new Error("Probably invalid city..");
        }
        const data = await res.json();
        console.log(data);
        arrCity.push(city);
        console.log(arrCity);
        getWeather(data);
      };
      accessAPI();
    } catch (err) {
      console.log(err);
    }
  }
});

const printErrorToDOM = (err) => {
  let errorSpan = document.getElementById("error");
  const errorContent = err;
  errorSpan.innerHTML = `${errorContent}`;
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
