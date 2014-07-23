'use strict';

angular.module('niiuWebappApp')
  .controller('TopbarCtrl', function ($scope, User) {
    
    $scope.toggleMenu = function() {
        User.toggleMenu();   	
    }

  });
