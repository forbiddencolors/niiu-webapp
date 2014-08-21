'use strict';

angular.module('niiuWebappApp')
  .controller('HelpCtrl', function ($scope, $window, User) {
    $window.scrollTo(0,0);
    $scope.pageClass='helpPage';

     $scope.toggleMenu = function() {
        User.toggleMenu(); 
     
    }

    //UserVoice Custom buttons
    // Or, use your own custom trigger:
	UserVoice.push(['addTrigger', '#helpContact', { mode: 'contact' }]);

  });
