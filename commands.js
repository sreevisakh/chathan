'use strict';

var express = require('express');
var router = express.Router();
var sudo = require('sudo');
var q = require('q');

var options = {
  cachePassword: true,
  prompt: 'Password, yo? ',
  spawnOptions: { /* other options for spawn */ }
};

router.get('/', function(req, res) {

  console.log(req);

  execute(req.query.key).then(function(response) {
    res.render('index', {
      key: req.query.key,
      output: response
    });
  });

});

function execute(key) {

  console.log('Command to execute : ' + key);

  var defered = q.defer();

  var objCommand = {
    command: key,
    sudo: false
  };

  console.log(objCommand);
  if (objCommand.sudo) {
    //if commands requires sudo
    var child = sudo([objCommand.command], options);
    child.stdout.on('data', function(data) {
      defered.resolve(data.toString());
    });
  } else {
    var exec = require('child_process').exec;
    exec(objCommand.command,
      function(error, stdout) {
        if (error !== null) {
          console.log('exec error: ' + error);
          defered.resolve(error);
        }
        defered.resolve(stdout);
      });
  }
  return defered.promise;
}

module.exports = router;
