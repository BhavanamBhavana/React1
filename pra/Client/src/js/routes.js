var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Navbar = require('./components/Navbar');
var Master = require('./components/Master');
var toc = require('./components/toc');
var HomePage = require('./components/Home');

module.exports = (
  <Route>
      <Route handler={Navbar} name="Navbar" path="/Navbar"/>
      <Route handler={Master}>
          <DefaultRoute handler={HomePage} name="HomePage"/>
      </Route>
      <Route handler={toc} name="toc" path="/toc"/>
  </Route>
);
