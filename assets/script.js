var searchButton = $("#search-button");
var clearButton = $("#clear-history");
console.log(searchButton);

// var apiKey = "b8ecb570e32c2e5042581abd004b71bb";

// // Forloop for persisting the data onto HMTL page
// for (var i = 0; i < localStorage.length; i++) {

//     var city = localStorage.getItem(i);
//     // console.log(localStorage.getItem("City"));
//     var cityName = $(".list-group").addClass("list-group-item");

//     cityName.append("<li>" + city + "</li>");
// }
var historyEl = $("#history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || []
var today = moment();
var cityName = $("#current-city");
var windSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");
var temp = $("#temperature");
var humidity = $("#humidity")
var form = $("#search-city");
var input = $("#myInput");
var lat;
var lon;
const apiKey = "895b542298f393087953e11563f64657";
// // const inputVal = form.value;
// // const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&lat=units=metric`;
console.log(form);
searchButton.click( e => {
  e.preventDefault();
  const inputVal = input.val();
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // do stuff with the data
    // var lat = data.coord.lat; 
    // var lon = data.coord.lon;
    console.log(lat);
    console.log(url);
    console.log(data)
    console.log(data.name);
    console.log(data.main.temp *9/5 + 32 + '\xB0 F');
    cityName.html(data.name + ' - ' + today.format("MMM Do, YYYY"));
    temp.html(data.main.temp *9/5 + 32 + '\xB0 F');
    humidity.html(data.main.humidity + ' %');
    windSpeed.html(data.wind.speed + ' MPH');
    // uvIndex.html(data.)
    getUV(data.coord.lat,data.coord.lon);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();

  })
  .catch(() => {
    // msg.text("Please search for a valid city 😩");
    input.attr("placeholder", "PLEASE ENTER A LOCATION");
     return;
  });

  var searchTerm = input.value;
  if (!searchTerm) {
    return;
  }
  //Add a conditional so that if the term is already in the history it will not push again
  if (!searchHistory.includes(searchTerm)){ 
      searchHistory.push(searchTerm);
  }
  // localStorage.setItem("search",JSON.stringify(searchHistory));
  // renderSearchHistory();

});

function getUV(lat,lon) {

  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('from git uv', data)
    uvIndex.html(data.current.uvi);
    getForecast(data);

  })

}

function getForecast(weather){

  console.log("from getForecast", weather)
}
// searchButton.click",function() {
//   var searchTerm = inputEl.value;
//   if (!searchTerm) {
//     input.setAttribute("placeholder", "PLEASE ENTER A LOCATION");
//     return;
//   }
//   //Add a conditional so that if the term is already in the history it will not push again
//   if (!searchHistory.includes(searchTerm)){ 
//       searchHistory.push(searchTerm);
//   }
//   localStorage.setItem("search",JSON.stringify(searchHistory));
//   renderSearchHistory();
// })

function renderSearchHistory() {
  historyEl.innerHTML = "";
  for (let i=0; i<searchHistory.length; i++) {
      var historyItem = document.createElement("input");
      historyItem.setAttribute("type","text");
      historyItem.setAttribute("readonly",true);
      historyItem.setAttribute("value", searchHistory[i]);
      // historyItem.addEventListener("click",function() {
      //     (historyItem.value);
      // var historicalLocation = (searchHistory[i]);
      
      // })
      historyEl.append(historyItem);
  }

};



clearButton.click(function() {
  historyEl.empty();
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
