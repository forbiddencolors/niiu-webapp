'use strict';

angular.module('niiuWebappApp')
  .controller('TopbarCtrl', function ($scope, User, constants, $window) {
    
    $scope.toggleMenu = function() {
        User.toggleMenu();  
        $window.scrollTo(0,0); 	
    }

    $scope.logo_path = constants.SOURCE_LOGO_PATH;

    $scope.getLogoPath =  function(sourceId) {
    	if (sourceId) {
    		return constants.SOURCE_LOGO_PATH;
    	} else {
    		return "";
    	}	
    }



  });
