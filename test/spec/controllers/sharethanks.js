'use strict';

describe('Controller: SharethanksCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var SharethanksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SharethanksCtrl = $controller('SharethanksCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
