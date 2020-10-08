$(document).ready(function() {

  var searches = [];

  init();

  function init() {
    var storedsearches = JSON.parse(localStorage.getItem("searches"));
    if (storedsearches !== null) {
      searches = storedsearches;
    }

    renderSearches();
  
    $("#searchButton").on("click", function () {
      var searchText = $("#searchInput").val();
      getTodayWeatherData(searchText);
      if (searchText === "") {
        return;
      }
      searches.unshift(searchText);
      storeSearches();
      $("#searchList").prepend("<li>" + searchText + "</li>");
    });
  }

    $("#clearButton").on("click", function (){
      localStorage.clear();
      location.reload();
    });

  function renderSearches() {

    for (var i = 0; i < searches.length; i++) {
      var search = searches[i];
      $("#searchList").prepend("<li>" + search + "</li>");
    }
  }

  function storeSearches() {
    localStorage.setItem("searches", JSON.stringify(searches));
  }

  function printTodayValues(today) {
    $("#city").text(today.name);
    $("#temp").text(today.main.temp);
    $("#humidity").text(today.main.humidity);
    $("#wind").text(today.wind.speed);
  }

  function getTodayWeatherData(city) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&units=imperial" +
        "&appid=0486554bde53629d52bf49b249547140",
      method: "GET"
    })
      .then(function (response) {
        console.log(response);
        printTodayValues(response); 
      })
      .catch(function (e) {
        $("#error").text(JSON.parse(e.responseText).message);
      });
  }
});
