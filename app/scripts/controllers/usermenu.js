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

    $scope.nextSection = function() {
        console.log('this pre next page is', $location.path());
    	console.log('next page is ', User.getNextSectionUrl($location.path()));
    	
    	$location.path(User.getNextSectionUrl($location.path()));

    }
 
  });