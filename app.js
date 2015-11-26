'use strict';
var express = require('express');
var app = express();
require('./router')(app);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', function(req, res) {
  res.render('index', {
    key: '',
    output: ''
  });
});
var server = app.listen(13713, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
