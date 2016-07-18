var React = require('react');

//Home Component
var IpData = React.createClass({
getInitialState: function() {
  return ({title:"",dataObj:[] });
},
handletitleChange: function(e) {
  this.setState({title: e.target.value});
},
handleSubmit: function(e) {
  e.preventDefault();
  var title = this.state.title;
  var urlstr="http://www.omdbapi.com/?s="+title;
  $.ajax({
    url: urlstr,
    dataType: 'json',
    cache: false,
    success: function(data) {
      if(data.Response !=="False"){
        var smovies=data.Search;
        var v=this.state.dataObj;
        var stateData=this.props.data;
        //console.log(stateData);
        smovies.forEach(function(d){
          var suburl='http://www.omdbapi.com/?i='+d.imdbID;
          $.ajax({
            url: suburl,
            dataType: 'json',
            cache: false,
            success: function(data1) {
              stateData(data1);
              v.push(data1);
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(urlstr, status, err.toString());
            }.bind(this)
          });
        });
        this.setState({title:"",dataObj:v});
      }
      else{
        var ermsg=this.state.dataObj;
        ermsg.push(this.state.title + " - Movie not found");
        this.setState({title:"",dataObj:ermsg});
      }
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(urlstr, status, err.toString());
    }.bind(this)
  });
},
render: function() {
  return (
        <form className="ipForm" onSubmit={this.handleSubmit} >
          <input type="text" className="form-control" style={{"width":"94%","float":"left"}}
                                     placeholder="Movie Title" value={this.state.title} onChange={this.handletitleChange}/>
          <input type="submit" style={{"float":"right"}} className="btn btn-success" value="Search"/>
        </form>
  );
}
});

var MovieData= React.createClass({
render: function() {
    var results = this.props.data;
    var refa=this.props.movierec;
    //console.log(results);
      var rsltdata=results.map(function(result) {
          if(typeof(result.Title) !=='undefined'){
          return(
          <div className="row" key={result.imdbID}>
            <div>
              <img className="img-circle" id="posterid" src={result.Poster} ></img>
              <div style={{"float":"left"}} id="dataid">
              <h3>{result.Title}</h3>
              <p>Released : {result.Released}</p>
              <p>Director : {result.Director}</p>
              <p>Actors : {result.Actors}</p>
              <p>imdbRating : {result.imdbRating}</p>
              <button className="btn btn-primary submit-btn" data-toggle="modal" data-target="#myModal1" onClick = {(event) => refa(result)}>View</button>
              </div>
            </div>
          </div>
          );
        }
    });
    return (<span>{rsltdata}</span>);
  }
});

// var Ratecomp=React.createClass({
//   render:function(){
//     var rating=Math.floor(this.props.ratingdata);
//     return ( <div></div> );
//   }
// });
//  <Ratecomp ratingdata={this.state.movier.imdbRating} ratingrec={this.displayRating}/>


var NewComponent = React.createClass({
getInitialState: function() {
  return ({data:[],movier:{}});
},
 addMovie : function (movie) {
   if(movie === null){
     return;
   }
   var memory = this.state.data;
   memory.push(movie);
   this.setState({data:memory});
 },
 displayMovie : function (movie) {
   console.log(movie);
    this.setState({movier:movie});
  },

addToDB : function(movie){
    var x= "mve/new";
    $.ajax({
          url : x,
          dataType : 'json',
          type : "POST",
          cache : false,
          data : this.state.movier,
          success : function(d){
            console.log("Added successfully");
          }.bind(this),
          error : function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
 render:function(){
   var mr=this.state.movier;
  return(
   <div className="container ContentWrapper" style={{"width":"80%"}}>

    <IpData data={this.addMovie}/>
    <MovieData data={this.state.data} movierec={this.displayMovie} />

    <div className="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div className="modal-body">
            ...
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document" id="ModalStyles">
        <div className="modal-content">
          <div className="modal-header">
            <button className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h3 className="modal-title" id="myModalLabel">{this.state.movier.Title}</h3>
          </div>
          <div className="modal-body">
          <div className="row">
          <div className="col-md-4">
            <img className="img-rounded" id="mposterid" src={this.state.movier.Poster} ></img>
          </div>
            <div className="col-md-8" id="mdataid">
              <p>Released : {this.state.movier.Released}</p>
              <p>Genre : {this.state.movier.Genre}</p>
              <p>Director : {this.state.movier.Director}</p>
              <p>Actors : {this.state.movier.Actors}</p>
              <p>Plot : {this.state.movier.Plot}</p>
              <p>Awards : {this.state.movier.Awards}</p>
              <span>Language : {this.state.movier.Language} | ImdbRating : {this.state.movier.imdbRating} </span>
            </div>
           </div>
          </div>
           <div className="modal-footer" id="myModalfooter">
           <button type="button" className="btn btn-primary" onClick = {(event) => this.props.addToDB({mr})}>Save To DB</button>
          </div>
       </div>
     </div>
   </div>
  </div>
);
}
});

module.exports=NewComponent;
