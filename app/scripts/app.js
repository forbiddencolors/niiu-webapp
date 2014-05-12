'use strict';

angular.module('niiuWebappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {   
        templateUrl: 'views/main.html',
        headerUrl: 'views/partials/loginmenu.html',
        controller: 'MainCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        headerUrl: 'views/partials/loginmenu.html',
        controller: 'RegistrationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function($rootScope, $route) {
  $rootScope.layoutPartial = function(partialName) { 
    //this works but throws errors before it loads
    if ($route.current) {
    return $route.current[partialName] ;
  }

  };


});


