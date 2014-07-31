'use strict';

describe('Controller: GuestmenuCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var GuestmenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuestmenuCtrl = $controller('GuestmenuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
