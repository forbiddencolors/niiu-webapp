'use strict';

describe('Service: Articleservice', function () {

  // load the service's module
  beforeEach(module('niiuWebappApp'));

  // instantiate service
  var Articleservice;
  beforeEach(inject(function (_Articleservice_) {
    Articleservice = _Articleservice_;
  }));

  it('should do something', function () {
    expect(!!Articleservice).toBe(true);
  });

});
