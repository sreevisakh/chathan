'use strict';

module.exports = function(app) {

  app.use('/commands', require('./commands'));

};
