'use strict';

describe('Controller: CustomizeCtrl', function () {

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var CustomizeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomizeCtrl = $controller('CustomizeCtrl', {
      $scope: scope
    });
  }));



/*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
*/
});
