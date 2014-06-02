'use strict';

describe('Filter: getByProperty', function () {

  // load the filter's module
  beforeEach(module('niiuWebappApp'));

  // initialize a new instance of the filter before each test
  var getByProperty;
  beforeEach(inject(function ($filter) {
    getByProperty = $filter('getByProperty');
  }));

  it('should return the input prefixed with "getByProperty filter:"', function () {
    var text = 'angularjs';
    expect(getByProperty(text)).toBe('getByProperty filter: ' + text);
  });

});
