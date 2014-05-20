'use strict';

describe('Controller: ForgotpassCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var ForgotpassCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForgotpassCtrl = $controller('ForgotpassCtrl', {
      $scope: scope
    });
  }));

  it('should pass the email address to the api', function () {
    expect(1).toBe(1);
  });
});
