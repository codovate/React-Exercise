var React = require("react");
var ZipCode  = require("./ZipCode");
var Navbar   = require("./Navbar");
var Redirect = require("react-router-dom").Redirect;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toForecast: false,
      location  : ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(location) {
    this.setState(function() {
      return {
        toForecast: true,
        location  : location
      };
    });
  }

  render() {
    if (this.state.toForecast) {
      return <Redirect to={"/forecast?city=" + this.state.location} />;
    }
    return (
      <div className="container">
        <Navbar title="Weather App">
          <ZipCode direction="row" onSubmitZipcode={this.handleSubmit} />
        </Navbar>

        <div
          className = "home-container"
          style     = {{ backgroundImage: "url('app/images/pattern.svg')" }}
        >
          <h1 className="header">Enter a City and State</h1>
          <ZipCode direction="column" onSubmitZipcode={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

module.exports = Home;
