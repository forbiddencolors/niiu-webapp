'use strict';

describe('Filter: encodeBase62', function () {

  // load the filter's module
  beforeEach(module('niiuWebappApp'));

  // initialize a new instance of the filter before each test
  var encodeBase62;
  beforeEach(inject(function ($filter) {
    encodeBase62 = $filter('encodeBase62');
  }));

  it('should return the input prefixed with "encodeBase62 filter:"', function () {
    var text = 'angularjs';
    expect(encodeBase62(text)).toBe('encodeBase62 filter: ' + text);
  });

});
