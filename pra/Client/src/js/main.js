var React = require('react');
var Router = require('react-router');
var routes = require('./routes.js');
var ReactDOM = require('react-dom');

Router.run(routes, Router.HistoryLocation, function(Root){
  React.render(<Root/>, document.body);
});
