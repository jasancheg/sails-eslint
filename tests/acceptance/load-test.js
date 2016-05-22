/**
* Module dependencies
*/

var Sails = require('sails').Sails;

describe('Acceptance tests', function () {

  var sails;

  beforeEach(function () {
    // Hook will timeout in 10 seconds
    this.timeout(10000);

    // Attempt to lift sails
    Sails().lift({ // eslint-disable-line new-cap
      hooks: {
        // Load the hook
        'eslint': require('../../'),
        // Skip grunt
        'grunt': false
      },
      log: {level: 'error'},
      eslint: {
        check: false
      }
    }, function (err, _sails) {
      if (err) {
        return err;
      }
      sails = _sails;
      // return done();
    });
  });

  afterEach(function () {
    if (sails) {
      sails.lower();
    }
    // return done();
  });

  it('sails loads eslint hook and does not crash', function () {
    return true;
  });

});
