var axios = require("axios");
var appid  = "2ef6cc34aad746d0b020552808c543f9";
var moment = require("moment");

function getForecast(zipcode) {
  return axios
    .get(
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
        zipcode +
        "&appid=" +
        appid
    )
    .then(function(forecast) {
      return forecast.data.list;
    });
}

function convertToDisplayDate($date_txt) {
  var m = moment($date_txt, "YYYY-MM-DD");
  return m.format("dddd, MMM D");
}

function getFiveDayForcast(forecastData) {
  var initialValue = {};
  var results      = forecastData.reduce(function(fivedayData, forecast) {
    var displayDate = convertToDisplayDate(forecast.dt_txt);
    if (!fivedayData[displayDate] && Object.keys(fivedayData).length < 5) {
      fivedayData[displayDate] = forecast;
    }
    return fivedayData;
  }, initialValue);

  return results;
}

function fiveDayShortDetails(forecastData) {
  var initialData = {};
  var results     = Object.keys(forecastData).reduce(function(
    daysBriefInfo,
    forecast,
    index
  ) {
    //console.log(forecastData[forecast]);
    //var           dayName         = "day" + index;
    // daysBriefInfo[index]          = {};
    // daysBriefInfo[index][dayName] = {};

    //console.log(daysBriefInfo);

    daysBriefInfo[index] = {
      day         : forecast,
      forecastIcon: forecastData[forecast].weather[0].icon
    };
    return daysBriefInfo;
  },
  initialData);

  return results;
}

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {
  fetchFiveDayForecast: function(zipcode) {
    return getForecast(zipcode)
      .then(function(data) {
        return getFiveDayForcast(data);
      })
      .then(function(data) {
        return fiveDayShortDetails(data);
      })
      .catch(handleError);
  }
};
