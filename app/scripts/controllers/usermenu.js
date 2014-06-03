'use strict';
 
angular.module('niiuWebappApp')
.controller('usermenuCtrl', function ($scope, $location, niiuAuthenticator, User) {
    console.log($location);

    $scope.logout = function() {
    	//niiuAuthenticator.changeUser();
    	User.deleteUser();
    	console.log('just deleted the User');
    	//niiuAuthenticator.logout();


 
    

    };
 
  });