'use strict';

describe('Filter: replaceUmlauts', function () {

  // load the filter's module
  beforeEach(module('niiuWebappApp'));

  // initialize a new instance of the filter before each test
  var replaceUmlauts;
  beforeEach(inject(function ($filter) {
    replaceUmlauts = $filter('replaceUmlauts');
  }));

  it('should return the input prefixed with "replaceUmlauts filter:"', function () {
    var text = 'angularjs';
    expect(replaceUmlauts(text)).toBe('replaceUmlauts filter: ' + text);
  });

});
