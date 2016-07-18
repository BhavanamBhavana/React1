var React = require('react');
var Router = require('react-router');


//var AuthStatus = require('../../components/AuthStatus/AuthStatus');

var RouteHandler = Router.RouteHandler;

var Master = React.createClass({
  render () {
    return (
      <div>
        <RouteHandler/>
        <hr/>
        </div>
    );
  }
});

module.exports = Master;
