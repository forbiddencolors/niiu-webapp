'use strict';

describe('Service: Facebook', function () {

  // load the service's module
  beforeEach(module('niiuWebappApp'));

  // instantiate service
  var Facebook;
  beforeEach(inject(function (_Facebook_) {
    Facebook = _Facebook_;
  }));

  it('should do something', function () {
    expect(!!Facebook).toBe(true);
  });

});
