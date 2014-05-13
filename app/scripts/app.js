'use strict';

angular.module('niiuWebappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $httpProvider) {
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
      .when('/emailLogin', {
        templateUrl: 'views/emaillogin.html',
        headerUrl: 'views/partials/loginmenu.html',
        controller: 'EmailloginCtrl'
      })
      .when('/userHome', {
        templateUrl: 'views/userhome.html',
        headerUrl: 'views/partials/loginmenu.html',
        controller: 'UserhomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });


    // This should globally set all post requests to send a post variables as opposed to a post payload
    $httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded'}; 
    $httpProvider.defaults.transformRequest.push(function (data, headerGetter) {
        console.log("transform Request");
        return data;
    });
    /*
    I think we only need to transform the post requests.
    $httpProvider.defaults.transformResponse.push(function (data, headerGetter) {
        console.log("transform Response");
        return data;
    });
    */


  }).run(function($rootScope, $route) {
  $rootScope.layoutPartial = function(partialName) { 
    //this works but throws errors before it loads
    if ($route.current) {
    return $route.current[partialName] ;
  }

  };


});


