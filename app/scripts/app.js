'use strict';

angular.module('niiuWebappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate'
])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {   
        templateUrl: 'views/main.html',
        headerUrl: '',
        controller: 'MainCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        headerUrl: '',
        controller: 'RegistrationCtrl'
      })
      .when('/emailLogin', {
        templateUrl: 'views/emaillogin.html',
        headerUrl: '',
        controller: 'EmailloginCtrl'
      })
      .when('/userHome', {
        templateUrl: 'views/userhome.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'UserhomeCtrl'
      })
      .when('/sectionHome', {
        templateUrl: 'views/sectionhome.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'SectionhomeCtrl'
      })
      .when('/forgotPass', {
        templateUrl: 'views/forgotpass.html',
        headerUrl: '',
        controller: 'ForgotpassCtrl'
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


  }).run(function($rootScope, $route, $location, niiuAuthenticator) {
  $rootScope.layoutPartial = function(partialName) { 
    //this works but throws errors before it loads
    if ($route.current) {
    return $route.current[partialName] ;
  }
  };




  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ['/', '/registration', '/tour', '/emailLogin', '/forgotPass' ];

  // check if current location matches route  
  var publicViews = function (route) {
    console.log('the route is requested is ', route);
    

    for (var i=0; i<routesThatDontRequireAuth.length; i++) {
        if (routesThatDontRequireAuth[i].substring(0, route.length) === route) {
          console.log('this is a public view');
          return true;
        }
    }
    console.log('that route is not public');
    return false;

  };

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
   
   console.log('are you logged in',niiuAuthenticator.isLoggedIn());
   //console.log();
   console.log($rootScope.user);

    //publicViews($location.url())
    // if route requires auth and user is not logged in
    if (!publicViews($location.url()) && !niiuAuthenticator.isLoggedIn($rootScope.user)) {

      console.log(' we have to go back to the home page because this ',!publicViews($location.url()),!niiuAuthenticator.isLoggedIn());

      // redirect back to login
      $location.path('/');
    }
  });







});



// niiuWebappApp.controller('MainCtrl', function($scope) {
//     $scope.pageClass = 'login-home';
// });

// niiuWebappApp.controller('EmailloginCtrl', function($scope) {
//     $scope.pageClass = 'login-menu';
// });

// // niiuWebappApp.controller('contactController', function($scope) {
// //     $scope.pageClass = 'page-contact';
// // });









