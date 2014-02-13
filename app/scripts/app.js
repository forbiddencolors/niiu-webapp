'use strict';

angular.module('demoWebAppApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute'
])
.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.when('/main', {
		templateUrl: 'views/main.html',
		controller: 'SectionsCtrl'
	})
	.when('/articles', {
		templateUrl: 'views/articles.html',
		controller: 'ArticlesCtrl'
	})
	.when('/article', {
		templateUrl: 'views/article.html',
		controller: 'ArticleCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});


	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
}]);
