var searchButton = $("#search-button");
console.log(searchButton);

// var apiKey = "b8ecb570e32c2e5042581abd004b71bb";

// // Forloop for persisting the data onto HMTL page
// for (var i = 0; i < localStorage.length; i++) {

//     var city = localStorage.getItem(i);
//     // console.log(localStorage.getItem("City"));
//     var cityName = $(".list-group").addClass("list-group-item");

//     cityName.append("<li>" + city + "</li>");
// }
var windSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");
var temp = $("#temperature");
var humidity = $("#humidity")
var form = $("#search-city");
var input = $("#myInput");
const apiKey = "895b542298f393087953e11563f64657";
// // const inputVal = form.value;
// // const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
console.log(form);
searchButton.click( e => {
  e.preventDefault();
  const inputVal = input.val();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // do stuff with the data
    console.log(data)
    console.log(data.name);
    console.log(data.main.temp *9/5 + 32);
    temp.html(data.main.temp *9/5 + 32);
    humidity.html(data.main.humidity);
    windSpeed.html(data.wind.speed);



  })
  .catch(() => {
    msg.textContent = "Please search for a valid city 😩";
  });

});

// const apiKey = "895b542298f393087953e11563f64657";
// const inputVal = form.value;
// const url = `https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=895b542298f393087953e11563f64657&units=metric`;

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     // do stuff with the data
//   })
//   .catch(() => {
//     msg.textContent = "Please search for a valid city 😩";
//   });
