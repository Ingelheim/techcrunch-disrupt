var http = require('http');
var request = require('request');

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

exports.getAllSavedLocations = function (callback) {
    http.get({
      hostname: 'localhost',
      port: 2345,
      path: '/locations',
      agent: false  // create a new agent just for this one request
    }, function(res) {
        res.on('data', function(d) {
          // con
        callback(JSON.parse(d));
    });
    }).on('error', function(e) {
      console.error(e);
    });
}

exports.saveLocations = function (locations, callback) {
  var options = {
      url: 'http://localhost:2345/savelocations',
      method: 'POST',
      json: locations
  }

  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          // console.log(body);
          callback()
          // res.send(body);
      } else {
        console.log("ERROR");
        // res.send({});
      }
  })
}
