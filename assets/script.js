// declaring variables for all measured statistics
var countryNameEl = $(".country .name")[0];
var totalCasesEl = $(".total-cases .value")[0];
var newCasesEl = $(".total-cases .new-value")[0];
var recoveredEl = $(".recovered .value")[0];
var newRecoveredEl = $(".recovered .new-value")[0];
var deathsEl = $(".deaths .value")[0];
var newDeathsEl = $(".deaths .new-value")[0];
​
var ctx = document.getElementById("axesLineChart").getContext("2d");

// list main variables
var appData = [];
var casesList = [];
var recoveredList = [];
var deathsList = [];
var dates = [];
var formatedDates = [];

// fetch country codes from api
// async/await not used here because fetch isn't inside a function, .then is used instead to handle the promise
fetch("https://api.ipgeolocation.io/ipgeo?apiKey=87c06e069cab4ce597da9c4dc04165d3")
  .then(function (res) {
    return res.json(); // list of countries 
  })

  .then(function (data) {
    var countryCode = data.country_code2;// inside json it has a county code 
    var userCountry;
    
    // this matches the code from list.js with the data fetched from the api.geolocation
    // country_list is accessible because a variable in the global scope is accessible to all scripts loaded after it is declared.
    for (var i = 0; i < country_list.length; i++) {
        if (country_list[i].code === countryCode) {
          userCountry = country_list[i].name
        }
    }
    fetchData(userCountry);
  });

  // fetch API data (cases, recovered, deaths,)
function fetchData(country) {
    userCountry = country;
    countryNameEl.innerHTML = "Loading...";
  ​
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    
    /**
   * @ description apiFetch async function handles all the fetch requests needed to retrieve covid stats 
   * @ returns json 
   */
  // function made asynchronous to resolve promise
  async function apiFetch(country) {
    //make request to covid api to get covid confirmed cases by country and save the results to confirmedRes variable
    var confirmedRes = await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/confirmed",
      requestOptions
    )

    // await used here to resolve the promise from .json()
    var confirmedData = await confirmedRes.json()
​
    for (var i = 0; i < confirmedData.length; i++) {
      // populate the dates array with entry dates from api
      dates.push(confirmedData[i].Date);
      // populate the casesList array with confirmed cases from api
      casesList.push(confirmedData[i].Cases);
    }
}
