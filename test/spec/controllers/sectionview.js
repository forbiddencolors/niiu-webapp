'use strict';

describe('Controller: SectionviewCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var SectionviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SectionviewCtrl = $controller('SectionviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
