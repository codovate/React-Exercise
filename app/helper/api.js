var axios = require("axios");
var appid = "2ef6cc34aad746d0b020552808c543f9";

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

// function getFiveDayForcast(data) {
//   var forcastArgs = {};
//   return data.reduce(function( day , forecast ) {
//       if (!day[forecast.list] )
//   }, forcastArgs );
// }

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {
  fetchFiveDayForecast: function(zipcode) {
    return getForecast(zipcode)
      .then(function(data) {
        return data;
      })
      .catch(handleError);
  }
};
