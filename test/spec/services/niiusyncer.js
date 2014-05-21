'use strict';

describe('Service: niiuSyncer', function () {

  // load the service's module
  beforeEach(module('niiuWebappApp'));

  // instantiate service
  var niiuSyncer;
  beforeEach(inject(function (_niiuSyncer_) {
    niiuSyncer = _niiuSyncer_;
  }));

  it('should do something', function () {
    expect(!!niiuSyncer).toBe(true);
  });

});
