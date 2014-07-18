'use strict';

angular.module('niiuWebappApp')
  .controller('TopbarCtrl', function ($scope) {
    
    $scope.slideMenu = function() {
    	//not working
    	console.log('slide menu');
    	
    	//$("#niiuAppmenu").trigger("open.mm");
    	
    }
    $scope.onMenu  = function() {
	    //$("#niiuAppmenu").mmenu();
	}
    $scope.navCollapsed = true;
  });
