var React = require("react");
var queryString = require("query-string");
var ZipCode     = require("./ZipCode");
var Navbar      = require("./Navbar");
var api         = require("../helper/api");
var Redirect    = require("react-router-dom").Redirect;

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daliyForecast: "",
      toForecast   : false,
      toLocation   : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  componentWillReceiveProps(nextProps) {
    var query = queryString.parse(nextProps.location.search);

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

  handleSubmit(location) {
    // this.setState(function() {
    //   return {
    //     toForecast: true,
    //     toLocation: location
    //   };
    // });
    this.props.history.push({
      pathname: "/forecast",
      search  : "?city=" + location
    });
    // history.push("/dresses?color=blue");
  }

  render() {
    if (this.state.toForecast) {
      return <Redirect to={"/forecast?city=" + this.state.toLocation} />;
    }
    return (
      <div className="container">
        <Navbar title="Weather App">
          <ZipCode direction="row" onSubmitZipcode={this.handleSubmit} />
        </Navbar>

        <div>{JSON.stringify(this.state.dailyForecast, null, 2)}</div>
      </div>
    );
  }
}

module.exports = Forecast;
