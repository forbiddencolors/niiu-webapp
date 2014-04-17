'use strict';

describe('Directive: articleID', function () {

  // load the directive's module
  beforeEach(module('demoWebAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<article-i-d></article-i-d>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the articleID directive');
  }));
});
