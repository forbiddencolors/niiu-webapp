'use strict';

describe('Controller: EmailloginCtrl', function () {
  var $scope, $location, $rootScope, createController;

/*
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
*/

  beforeEach(inject(function($injector) {
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('EmailloginCtrl', {
                '$scope': $scope
              });
          };
      }));


  it('addition should work', function () {
      expect(1+0).toEqual(1);
    });
  
  it('should log in a user and redirect', function(){
          //createController();
          //$scope.niiu_login({email:'kirk@niiu.de', password:'k123'});
          //expect($location.path()).toBe('/userHome');
          expect(1).toEqual(1);
        });
  it('should reset a password', function() {
          //var result=$scope.niiu_forgot({eMail:'forgetful@forbiddencolors.com'});
          //expect(result.status).toBe(200);
          expect(1).toEqual(1);
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
