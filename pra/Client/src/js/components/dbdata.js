var React = require('react');
var Navbar = require('./Navbar');

//Home Component
var Home = React.createClass({
  componentWillMount():function() {
    var x= "mve/new";
    $.ajax({
          url : x,
          dataType : 'json',
          type : "GET",
          cache : false,
          data : this.state.movier,
          success : function(d){
            console.log("Added successfully");
          }.bind(this),
          error : function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });

  }
    render: function() {
        return (

        );
    }
});

module.exports = Home;
