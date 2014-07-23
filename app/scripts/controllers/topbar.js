'use strict';

angular.module('niiuWebappApp')
  .controller('TopbarCtrl', function ($scope) {
    
    $scope.toggleMenu = function() {
    	if($scope.hideMenu == true) {
        	console.log('hide menu');
            angular.element('.sidebar-offcanvas').removeClass('active');
            angular.element('.row-offcanvas-left').removeClass('active');
            $scope.hideMenu=false;
         } else {
            console.log('show menu');
            angular.element('.sidebar-offcanvas').addClass('active');
             angular.element('.row-offcanvas-left').addClass('active');
            $scope.hideMenu=true;

         }  


        
    	
    	//$("#niiuAppmenu").trigger("open.mm");
    	
    }
    $scope.onMenu  = function() {
	    //$("#niiuAppmenu").mmenu();
	}
    $scope.navCollapsed = true;
    $scope.hideMenu= true;
  });
