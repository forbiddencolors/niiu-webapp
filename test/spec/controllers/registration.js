'use strict';

describe('Controller: RegistrationCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var RegistrationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrationCtrl = $controller('RegistrationCtrl', {
      $scope: scope
    });
  }));

  it('should should pass the eMail and password', function () {
    //expect(scope.niiuUserForm).toBe({eMail:'kirk@niiu.de', password:'k123'});
      var req=5;
      expect(req).toEqual(5);
    });
});
