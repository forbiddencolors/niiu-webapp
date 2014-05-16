'use strict';
 
angular.module('niiuWebappApp')
.controller('usermenuCtrl', function ($scope, $location, niiuAuthenticator) {
    console.log($location);

    $scope.logout = function() {
    	niiuAuthenticator.changeUser();
    	console.log('just logged out');
    	niiuAuthenticator.logout();


 
    

    };
 
  });