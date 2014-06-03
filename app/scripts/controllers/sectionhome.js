'use strict';

angular.module('niiuWebappApp')
  .controller('SectionhomeCtrl', function ($scope,Articleservice) {

	$scope.articles=Articleservice.getArticles();
	console.log('getting some articles',$scope.articles);





  });
