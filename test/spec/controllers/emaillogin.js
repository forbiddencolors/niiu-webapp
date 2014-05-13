'use strict';

describe('Controller: EmailloginCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var EmailloginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailloginCtrl = $controller('EmailloginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
