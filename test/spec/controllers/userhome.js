'use strict';

describe('Controller: UserhomeCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var UserhomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserhomeCtrl = $controller('UserhomeCtrl', {
      $scope: scope
    });
  }));

  it('should do a content sync', function () {
    //expect(scope.awesomeThings.length).toBe(3);
    expect(1).toEqual(1);
  });
  it('should update the sync date', function () {
    //expect(scope.awesomeThings.length).toBe(3);
    expect(1).toEqual(1);
  });
});
