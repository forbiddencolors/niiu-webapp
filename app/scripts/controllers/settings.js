'use strict';

angular.module('niiuWebappApp')
  .controller('SettingsCtrl', function ($scope, $window, $translate, User, niiuAuthenticator) {
	$window.scrollTo(0,0);
	$scope.pageClass="settingsPage";

    $scope.toggleMenu = function() {
        User.toggleMenu(); 
     
    }

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };

    $scope.logout = function() {
    	//niiuAuthenticator.changeUser();
        User.toggleMenu(false);
    	User.deleteUser();
    	console.log('just deleted the User');
    	niiuAuthenticator.logout();

    };
  });
