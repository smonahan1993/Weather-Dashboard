var form = document.querySelector("#search-city");

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;
});

const apiKey = "895b542298f393087953e11563f64657";
const inputVal = input.value;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // do stuff with the data
  })
  .catch(() => {
    msg.textContent = "Please search for a valid city 😩";
  });
