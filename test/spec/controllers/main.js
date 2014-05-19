'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));


    // basics
  it('ensure clicking email login goes to email registration', function() {});
  it('ensure clicking facebook goes to facebook registration', function() {});
  it('ensure clicking registration goes to registration page', function() { });



});
