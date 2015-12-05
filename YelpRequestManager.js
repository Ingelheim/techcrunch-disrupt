var http = require('http');

exports.requestLocationsFor = function (city, term, callback) {
    http.get({
      hostname: 'localhost',
      port: 4567,
      path: '/location?location='+ encodeURIComponent(city) +'&term=' + encodeURIComponent(term),
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
