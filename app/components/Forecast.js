var React = require('react');
var queryString = require('query-string');
var ZipCode     = require('./ZipCode');
var Navbar      = require('./Navbar');
var api         = require('../helper/api');
var Redirect    = require('react-router-dom').Redirect;
var DayForecast = require('./DayForecast');


class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyForecast      : '',
      location           : '',
      toDetails          : false,
      selectedDayIcon    : '',
      selectedDayDateInfo: '',
      extraDaydata: ''
    };

    this.handleSubmit     = this.handleSubmit.bind(this);
    this.getForecastData  = this.getForecastData.bind(this);
    this.handleDayClicked = this.handleDayClicked.bind(this);
  }

  componentDidMount() {
    //e.g: It will parse: "?city=london" and return an object or the query parameters
    //e.g:  It will become: {city: 'london'}
    var query = queryString.parse(this.props.location.search);
    this.getForecastData(query);
  }

  componentWillReceiveProps(nextProps) {
    var query = queryString.parse(nextProps.location.search);
    this.getForecastData(query);
  }

  getForecastData(query) {
    api.fetchFiveDayForecast(query.city).then(
      function(data) {
        this.setState(function() {
          return {
            dailyForecast: data,
            location     : query.city,
          };
        });
      }.bind(this),
    );
  }

  handleSubmit(location) {
    this.props.history.push({
      pathname: '/forecast',
      search  : '?city=' + location,
    });
  }

  handleDayClicked(icon, dayDateInfo, extraDaydata) {
    this.setState(function() {
      return {
        toDetails          : true,
        selectedDayIcon    : icon,
        selectedDayDateInfo: dayDateInfo,
        extraDaydata : extraDaydata
      };
    });
  }

  render() {
    var dailyForecast = this.state.dailyForecast;
    if (this.state.toDetails) {
      return <Redirect to={{ pathname: '/details/' + this.state.location , state: { location: this.state.location, icon: this.state.selectedDayIcon,
        dayDateInfo: this.state.selectedDayDateInfo, extraDaydata: this.state.extraDaydata } }} />;
    }
    return (
      <div className="Container">
        <Navbar title="Weather App">
          <ZipCode direction="row" onSubmitZipcode={this.handleSubmit} />
        </Navbar>

        <div>
          <h1 className="forecast-header">{this.state.location}</h1>
          <div className="forecast-container">
            <ul>
              {Object.keys(dailyForecast).map(function(forecast) {
                return (
                  <li key={forecast}>
                    <DayForecast
                      icon     = {dailyForecast[forecast].forecastIcon}
                      dateInfo = {dailyForecast[forecast].day}
                      description = {dailyForecast[forecast].data.description}
                      min_temp = {dailyForecast[forecast].data.minTemp }
                      max_temp = { dailyForecast[forecast].data.maxTemp}
                      humidity = {dailyForecast[forecast].data.humidity}
                      onClick  = {this.handleDayClicked}
                    />
                  </li>
                );
              }, this )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Forecast;
