'use strict';

describe('Filter: sectionFilter', function () {

  // load the filter's module
  beforeEach(module('niiuWebappApp'));

  // initialize a new instance of the filter before each test
  var sectionFilter;
  beforeEach(inject(function ($filter) {
    sectionFilter = $filter('sectionFilter');
  }));

  it('should return the input prefixed with "sectionFilter filter:"', function () {
    var text = 'angularjs';
    expect(sectionFilter(text)).toBe('sectionFilter filter: ' + text);
  });

});
