var React = require("react");
var PropTypes = require("prop-types");

function Navbar(props) {
  return (
    <div className="navbar">
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

module.exports = Navbar;
