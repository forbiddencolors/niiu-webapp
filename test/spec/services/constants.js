'use strict';

describe('Service: constants', function () {

  // load the service's module
  beforeEach(module('niiuWebappApp'));

  // instantiate service
  var constants;
  beforeEach(inject(function (_constants_) {
    constants = _constants_;
  }));

  it('should know constants like the niiu app guid', function () {
    expect(constants.NIIU_APP_GUID).toEqual('3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c');
  });

});
