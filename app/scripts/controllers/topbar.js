'use strict';

angular.module('niiuWebappApp')
  .controller('TopbarCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.navCollapsed = true;
  });
