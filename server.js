var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var YelpRequestManager = require('./YelpRequestManager.js');
var DBManager = require('./DBManager.js');

// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  DBManager.getAllSavedLocations(function(results) {
    res.render('index', { results : results});
  });
});

app.post('/searchYelp', function (req, res) {
  YelpRequestManager.requestLocationsFor(req.body.city, req.body.searchTerm, function(results) {
    res.render('results', { results : results});
  });
});

app.post('/saveLocations', function (req, res) {
  DBManager.saveLocations(req.body, function() {
    res.redirect('/');
  })
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
