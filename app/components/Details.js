var React = require("react");
var ZipCode     = require('./ZipCode');
var Navbar      = require('./Navbar');
var Redirect    = require('react-router-dom').Redirect;
var DayForecast = require('./DayForecast');

class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            icon: '',
            dateInfo : '',
            toForecast:  false,
            location : '',
            extraDaydata: '',
        }

     this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        this.setState(function(){
            return {
                icon: this.props.location.state.icon,
                dateInfo: this.props.location.state.dayDateInfo,
                location : this.props.location.state.location,
                extraDaydata : this.props.location.state.extraDaydata
            }
        });
    }
    handleSubmit(location) {
        this.setState(function() {
            return {
                toForecast: true,
                location  : location
            };
        });
    }

    render(){
        if (this.state.toForecast) {
            return <Redirect to={"/forecast?city=" + this.state.location} />;
        }



        return (
            <div className="Container">
                <Navbar title="Weather App">
                    <ZipCode direction="row" onSubmitZipcode={this.handleSubmit} />
                </Navbar>

                <div className="DayForeCastDetails">
                    <DayForecast
                        icon     = {this.state.icon}
                        dateInfo = {this.state.dateInfo}
                    />
                    <div className="dayDetails" >
                        <div className="city" > { this.state.location }</div>
                        <div className="description" > { this.state.extraDaydata.description }</div>
                        <div className="min-temp" > <span> min temp: </span> { Math.round(this.state.extraDaydata.min_temp) }<span> degress </span></div>
                        <div className="max-temp" > <span> max temp: </span> { Math.round(this.state.extraDaydata.max_temp) }<span> degress </span>  </div>
                        <div className="humidity" > <span> humidity: </span> { this.state.extraDaydata.humidity }</div>
                    </div>

                </div>

            </div>
        )
    }
}

module.exports = Details;