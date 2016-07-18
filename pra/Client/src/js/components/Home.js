var React = require('react');
var Navbar = require('./Navbar');

//Home Component
var Home = React.createClass({
    render: function() {
        return (
            <div className="well">
            <Navbar />
                <div className="page-header">
                    <h1>The BEST  movies you should watch before you die..</h1>
                </div>
                <p className="lead"><small>If you've spent your lifetime cribbing
                 about never getting to watch good movies, it is the right time to watch because you won't be around for too long.</small></p>
            </div>
        );
    }
});

module.exports = Home;
