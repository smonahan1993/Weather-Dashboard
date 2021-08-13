var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var uvBG = $("span#uv-index")
var fDate0 = $("#fDate0");
var fDate1 = $("#fDate1");
var fDate2 = $("#fDate2");
var fDate3 = $("#fDate3");
var fDate4 = $("#fDate4");
var fImg0 = $("#fImg0");
var fImg1 = $("#fImg1");
var fImg2 = $("#fImg2");
var fImg3 = $("#fImg3");
var fImg4 = $("#fImg4");
var fTemp0 = $("#fTemp0");
var fTemp1 = $("#fTemp1");
var fTemp2 = $("#fTemp2");
var fTemp3 = $("#fTemp3");
var fTemp4 = $("#fTemp4");
var fHumidity0 = $("#fHumidity0");
var fHumidity1 = $("#fHumidity1");
var fHumidity2 = $("#fHumidity2");
var fHumidity3 = $("#fHumidity3");
var fHumidity4 = $("#fHumidity4");
var fWind0 = $("#fWind0");
var fWind1 = $("#fWind1");
var fWind2 = $("#fWind2");
var fWind3 = $("#fWind3");
var fWind4 = $("#fWind4");
var historyEl = $("#history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || []
var today = moment();
var day0 = moment().add(1,'days')
var day1 = moment().add(2,'days')
var day2 = moment().add(3,'days')
var day3 = moment().add(4,'days')
var day4 = moment().add(5,'days')
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

  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('from git uv', data)
    uvIndex.html(data.current.uvi);
    getForecast(data);
    
    console.log(data.current.uvi)

    if (data.current.uvi < 3) {
      uvBG.css("background-color","green");
  } else if (data.current.uvi > 2 & data.current.uvi < 6) {
      uvBG.css("background-color","orange");
  } else if (data.current.uvi > 6) {
      uvBG.css("background-color","red");
      
  }

  })

}

function getForecast(data){
  var weathericon0= data.daily[0].weather[0].icon;
  var weathericon1= data.daily[1].weather[0].icon;
  var weathericon2= data.daily[2].weather[0].icon;
  var weathericon3= data.daily[3].weather[0].icon;
  var weathericon4= data.daily[4].weather[0].icon;
  var iconurl0="https://openweathermap.org/img/wn/"+weathericon0 +"@2x.png";
  var iconurl1="https://openweathermap.org/img/wn/"+weathericon1 +"@2x.png";
  var iconurl2="https://openweathermap.org/img/wn/"+weathericon2 +"@2x.png";
  var iconurl3="https://openweathermap.org/img/wn/"+weathericon3 +"@2x.png";
  var iconurl4="https://openweathermap.org/img/wn/"+weathericon4 +"@2x.png";
  fDate0.html(day0.format("MMM Do, YYYY"));
  fDate1.html(day1.format("MMM Do, YYYY"));
  fDate2.html(day2.format("MMM Do, YYYY"));
  fDate3.html(day3.format("MMM Do, YYYY"));
  fDate4.html(day4.format("MMM Do, YYYY"));
  fImg0.html("<img src="+iconurl0+">")
  fImg1.html("<img src="+iconurl1+">")
  fImg2.html("<img src="+iconurl2+">")
  fImg3.html("<img src="+iconurl3+">")
  fImg4.html("<img src="+iconurl4+">")
  fTemp0.html(data.daily[0].temp.day);
  fTemp1.html(data.daily[1].temp.day);
  fTemp2.html(data.daily[2].temp.day);
  fTemp3.html(data.daily[3].temp.day);
  fTemp4.html(data.daily[4].temp.day);
  fHumidity0.html(data.daily[0].humidity);
  fHumidity1.html(data.daily[1].humidity);
  fHumidity2.html(data.daily[2].humidity);
  fHumidity3.html(data.daily[3].humidity);
  fHumidity4.html(data.daily[4].humidity);
  fWind0.html(data.daily[0].wind_speed);
  fWind1.html(data.daily[1].wind_speed);
  fWind2.html(data.daily[2].wind_speed);
  fWind3.html(data.daily[3].wind_speed);
  fWind4.html(data.daily[4].wind_speed);
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
