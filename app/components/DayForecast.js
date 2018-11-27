var React = require('react');
var PropTypes = require('prop-types');

class DayForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon    : '',
      dateInfo: '',
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
      var extraDaydata = {
         description :  this.props.description,
         min_temp: this.props.min_temp,
         max_temp: this.props.max_temp,
         humidity: this.props.humidity
      }
    this.props.onClick(this.props.icon, this.props.dateInfo, extraDaydata );
  }
  render() {
    return (
      <div onClick={this.handleOnClick}>
        <img src={'../app/images/weather-icons/' + this.props.icon + '.svg'} />
        <h2>{this.props.dateInfo}</h2>
      </div>
    );
  }
}

DayForecast.propTypes = {
  icon    : PropTypes.string.isRequired,
  dateInfo: PropTypes.string.isRequired,
  description: PropTypes.string,
  min_temp: PropTypes.number,
  max_temp: PropTypes.number,
  humidity: PropTypes.number,
  onClick : PropTypes.func,
};

module.exports = DayForecast;
