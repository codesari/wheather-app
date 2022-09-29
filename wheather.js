const form = document.getElementById("form");
let arrCity = [];

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
  form.reset();
});

const printErrorToDOM = (err) => {
  let errorSpan = document.getElementById("error");
  const errorContent = err;
  errorSpan.innerHTML = `${errorContent}`;
  setTimeout(() => {
    errorSpan.innerHTML = "";
  }, 3000);
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

  // const container = document.getElementById("container");
  const ul = document.querySelector(".container ul");
  const li = document.createElement("li");
  // ! ul-li ve Bootstrap'in birlikte kullanımı
  ul.className = "row m-4 g-3";
  li.className = "col-md-6 col-lg-4 col-xl-3";
  li.innerHTML = `
  
      
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
  ul.prepend(li);
  // console.log(newTemp);
  // console.log(name);
  // console.log(country);
  // console.log(temp);
  // console.log(weather[0].icon);
  // console.log(weather[0].description);
};
