var React = require('react');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var Route         = require('react-router-dom').Route;
var Switch        = require('react-router-dom').Switch;
var Home          = require('./Home');
var Forecast      = require('./Forecast');
var Details = require('./Details');

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/forecast" component={Forecast} />
           <Route  path="/details" component={Details} />
        </Switch>
      </BrowserRouter>
    );
  }
}

module.exports = App;
