'use strict';

describe('Controller: EmailloginCtrl', function () {
  var $scope, $location, $rootScope, $controller;

  // load the controller's module
  beforeEach(module('niiuWebappApp'));

  var EmailloginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(inject(function($injector)  {
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        EmailloginCtrl = $controller('EmailloginCtrl', {
          $scope: $scope
        });
      }
  )));

  it('addition should work', function () {
      expect().toEqual(1);
    });
  
  it('should log in a user and redirect', function(){
           
          scope.niiu_login({email:'kirk@niiu.de', password:'k123'});
          expect(location.path()).toBe('/userHome');
        });
/*
    it('should be invalid if empty', function() {
      input.clear();
      input.sendKeys('');

      //expect(text.getText()).toEqual('text =');
      expect(valid.getText()).toContain('false');
    });
  */




});
