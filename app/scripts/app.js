'use strict';

angular.module('niiuWebappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
 // 'ngAnimate',
  'ngTouch',
  'ui.bootstrap',
  'pascalprecht.translate'
])
  .config(function ($routeProvider, $httpProvider, $translateProvider) {
    $routeProvider
      .when('/', {   
        templateUrl: 'views/main.html',
        headerUrl: '',
        controller: 'MainCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        headerUrl: 'views/partials/loginmenu.html',
        controller: 'RegistrationCtrl'
      })
      .when('/emailLogin', {
        templateUrl: 'views/emaillogin.html',
        headerUrl: '',
        controller: 'EmailloginCtrl'
      })
      .when('/userHome/:refresh?', {
        templateUrl: 'views/userhome.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'UserhomeCtrl',
        pageClass: 'userHome'
      })
      .when('/sectionHome/:sourceId?/:sectionId?/:customId?', {
        templateUrl: 'views/sectionhome.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'SectionhomeCtrl'
      })
      .when('/forgotPass', {
        templateUrl: 'views/forgotpass.html',
        headerUrl: 'views/partials/loginmenu.html',
        controller: 'ForgotpassCtrl'
      })
      .when('/privacy', {
        templateUrl: 'views/privacy.html',
        headerUrl: 'views/partials/loginmenu.html',
        controller: 'PrivacyCtrl'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        headerUrl: 'views/partials/loginmenu.html',
        controller: 'TermsCtrl'
      })
      .when('/customize', {
        templateUrl: 'views/customize.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'CustomizeCtrl',
        pageClass: 'menuPage'
      })
      .when('/sectionHome', {
        templateUrl: 'views/sectionhome.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'SectionhomeCtrl'
      })
      .when('/article/:articleId', {
        templateUrl: 'views/article.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'ArticleCtrl',
        pageClass: 'articlePage'
      })
      .when('/sectionView/0', {
        templateUrl: 'views/userhome.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'UserhomeCtrl',
        pageClass: 'userHome'
      })
      .when('/sectionView/:contentObjId?', {
        templateUrl: 'views/sectionview.html',
        headerUrl: 'views/partials/usermenu.html',
        controller: 'SectionviewCtrl',
        pageClass: 'sectionPage'
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


  $translateProvider.useStaticFilesLoader({
    'prefix': '/lang/locale-',
    'suffix': '.json'
});
  $translateProvider.preferredLanguage('de');
   $translateProvider.fallbackLanguage('en');
   $translateProvider.useLocalStorage();


   //$translateProvider.useLocalStorage();
   $translateProvider.determinePreferredLanguage(function(anything) {
        console.log('determinePreferredLanguage returned ',anything);
        //lets say the default langauge will be german
        var lang_key="de";
         var language = window.navigator.userLanguage || window.navigator.language;
            console.log('this users browser likes',language);
            if(language.indexOf('en') !== -1) {
              //however if the user speaks any type of english (en_US, en_UK, use german instead)
              lang_key="en";
            } 
            return lang_key;
   }
    );

    //.preferredLanguage('de')
  //.fallbackLanguage('en')
  //.determinePreferredLanguage()

  //$translateProvider.determinePreferredLanguage();

        //console.log('this dude prefers speaking',lang);





  }).run(function($rootScope, $route, $location, niiuAuthenticator) {
  $rootScope.layoutPartial = function(partialName) { 
    //this works but throws errors before it loads
    if ($route.current) {
    return $route.current[partialName] ;
  }
  };




  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ['/', '/registration', '/tour', '/emailLogin', '/forgotPass', '/privacy', '/terms' ];

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
   //console.log('requesting page ',next);
   console.log($rootScope.user);

    //publicViews($location.url())
    // if route requires auth and user is not logged in
    //add an && 0 to this check if you want to stop authentication check redirections
    if (!publicViews($location.url()) && !niiuAuthenticator.isLoggedIn($rootScope.user) ) {

      console.log(' we have to go back to the home page because this ',!publicViews($location.url()),!niiuAuthenticator.isLoggedIn());

      // redirect back to login
      $location.path('/');
    } 
  });








});


