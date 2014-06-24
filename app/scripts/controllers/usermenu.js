'use strict';
 
angular.module('niiuWebappApp')
.controller('usermenuCtrl', function ($scope, $location, niiuAuthenticator, User) {
    console.log($location);

    $scope.logout = function() {
    	//niiuAuthenticator.changeUser();
    	User.deleteUser();
    	console.log('just deleted the User');
    	niiuAuthenticator.logout();

    };

    $scope.nextSection = function() {
        console.log('this pre next page is', $location.path());
    	console.log('next pageurl is ', User.getNextSectionUrl($location.path()));
  
    	
    	$location.path(User.getNextSectionUrl($location.path()));


    };

    $scope.nextPage = function() {
       // console.log('next contentPage is '+ User.getNextSection());
        
        $location.path("/sectionView/" + User.getNextSection());


    };


    $scope.keyPress = function(keyCode){
       console.log("someone pressed",keyCode);
       if (keyCode==39) {

        console.log('time to go to the next section');
        $location.path(User.getNextSectionUrl($location.path()));

       }
    }
 
  });