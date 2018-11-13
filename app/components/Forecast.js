var React = require("react");
var queryString = require("query-string");
var api         = require("../helper/api");

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daliyForecast: ""
    };
  }

  componentDidMount() {
    //e.g: It will parse: "?city=london" and return an object or the query parameters
    //e.g:  It will become: {city: 'london'}
    var query = queryString.parse(this.props.location.search);

    api.fetchFiveDayForecast(query.city).then(
      function(data) {
        this.setState(function() {
          return {
            dailyForecast: data
          };
        });
      }.bind(this)
    );
  }

  render() {
    return <div>{JSON.stringify(this.state.dailyForecast, null, 2)}</div>;
  }
}

module.exports = Forecast;
