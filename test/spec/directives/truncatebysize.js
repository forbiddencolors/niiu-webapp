'use strict';

describe('Directive: truncateBySize', function () {

  // load the directive's module
  beforeEach(module('niiuWebappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<truncate-by-size></truncate-by-size>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the truncateBySize directive');
  }));
});
