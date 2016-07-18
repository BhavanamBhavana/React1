var React = require('react');
var Link = require('react-router').Link;

var Navbar = React.createClass({
    render: function() {
        return (
            <div className="navbar navbar-fixed-top">
                <div className="container">
                    <button className="navbar-toggle" data-target=".navbar-responsive-collapse" data-toggle="collapse" type="button">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="nav-collapse collapse navbar-responsive-collapse">
                        <ul className="nav navbar-nav">
                        <li> </li>
                            <li className="active"><Link to="/HomePage">HomePage</Link></li>
                            <li className=""><Link to="/toc">Search And Save</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Navbar;
