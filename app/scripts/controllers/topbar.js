'use strict';

angular.module('niiuWebappApp')
  .controller('TopbarCtrl', function ($scope) {
    
    $scope.slideMenu = function() {
    	//not working
    	console.log('slide menu');
    	$("#niiuAppmenu").mmenu();
    	
    }

    $scope.navCollapsed = true;
  });
