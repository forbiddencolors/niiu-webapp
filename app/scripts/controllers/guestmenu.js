'use strict';

angular.module('niiuWebappApp')
  .controller('GuestmenuCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.browser=navigator.userAgent;
  });
