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
		templateUrl: '/views/login.html',
		controller: 'LoginCtrl'
	})
	.when('/main', {
		templateUrl: '/views/main.html',
		controller: 'SectionsCtrl'
	})
	.when('/articles', {
		templateUrl: '/views/articles.html',
		controller: 'ArticlesCtrl'
	})
	.when('/article/:id', {
		templateUrl: '/views/article.html',
		controller: 'ArticleCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});


	// $routeProvider
	// .when('/', {
	// 	templateUrl: 'niiu-demo/views/login.html',
	// 	controller: 'LoginCtrl'
	// })
	// .when('/main', {
	// 	templateUrl: 'niiu-demo/views/main.html',
	// 	controller: 'SectionsCtrl'
	// })
	// .when('/articles', {
	// 	templateUrl: 'niiu-demo/views/articles.html',
	// 	controller: 'ArticlesCtrl'
	// })
	// .when('/article/:id', {
	// 	templateUrl: '../niiu-demo/views/article.html',
	// 	controller: 'ArticleCtrl'
	// })
	// .otherwise({
	// 	redirectTo: '/'
	// });

	// $routeProvider
	// .when('http://localhost/niiu/niiu-webapp/dist/', {
	// 	templateUrl: '../views/login.html',
	// 	controller: 'LoginCtrl'
	// })
	// .when('http://localhost/niiu/niiu-webapp/dist/main', {
	// 	templateUrl: '../views/main.html',
	// 	controller: 'SectionsCtrl'
	// })
	// .when('http://localhost/niiu/niiu-webapp/dist/articles', {
	// 	templateUrl: '../views/articles.html',
	// 	controller: 'ArticlesCtrl'
	// })
	// .when('http://localhost/niiu/niiu-webapp/dist/article/:id', {
	// 	templateUrl: '../niiu-demo/views/article.html',
	// 	controller: 'ArticleCtrl'
	// })
	// .otherwise({
	// 	redirectTo: 'http://localhost/niiu/niiu-webapp/dist/'
	// });





	$httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';


	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
}]);
