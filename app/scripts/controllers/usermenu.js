'use strict';
 
angular.module('niiuWebappApp')
.controller('usermenuCtrl', function ($scope, $location, $translate, niiuAuthenticator, User) {
    console.log($location);

    User.getContentObject().then(function(contentObject) {
        $scope.contentObject=contentObject;
        console.log('the menu got a contentObject',contentObject);

    },function(error_contentObject) {
        $scope.error=error_contentObject;
        console.log('the couldnt get a contentObject',error_contentObject);

    });

    $scope.logout = function() {
    	//niiuAuthenticator.changeUser();
    	User.deleteUser();
    	console.log('just deleted the User');
    	niiuAuthenticator.logout();

    };

    $scope.toggleMenu = function() {
        User.toggleMenu();      
    }

    $scope.nextSection = function() {
        console.log('this pre next page is', $location.path());
    	console.log('next pageurl is ', User.getNextSectionUrl($location.path()));
  
    	
    	$location.path(User.getNextSectionUrl($location.path()));


    };

    $scope.nextPage = function() {
       // console.log('next contentPage is '+ User.getNextSection());
        
        $location.path("/sectionView/" + User.getNextSection());


    };
        $scope.currentPage = function() {
        console.log('next contentPage is '+ User.getCurrentSection());
        
        $location.path("/sectionView/" + User.getCurrentSection());


    };


    $scope.keyPress = function(keyCode){
       console.log("someone pressed",keyCode);
       if (keyCode==39) {

        console.log('time to go to the next section');
        $location.path(User.getNextSectionUrl($location.path()));

       }
    };

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
      };
 
  });