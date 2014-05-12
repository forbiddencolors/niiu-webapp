'use strict';

describe('Service: niiuAuthenticator', function () {

  // load the service's module
  beforeEach(module('niiuWebappApp'));

  // instantiate service
  var niiuAuthenticator;
  beforeEach(inject(function (_niiuAuthenticator_) {
    niiuAuthenticator = _niiuAuthenticator_;
  }));

  it('should do something', function () {
    expect(!!niiuAuthenticator).toBe(true);
  });

});
