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
​