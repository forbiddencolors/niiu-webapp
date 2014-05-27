'use strict';
 
angular.module('niiuWebappApp')
.controller('loginmenuCtrl', function ($scope, $location, niiuAuthenticator) {
    console.log($location);

    $scope.logout = function() {
    	niiuAuthenticator.changeUser();
    	console.log('just logged out');
    	niiuAuthenticator.logout();    

    };
 

 
  });