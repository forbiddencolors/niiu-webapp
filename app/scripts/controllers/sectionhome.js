'use strict';

angular.module('niiuWebappApp')
  .controller('SectionhomeCtrl', function ($scope,$routeParams,Articleservice) {

	$scope.articles=Articleservice.getArticles();
	$scope.sectionId=$routeParams.sectionId;
	$scope.sourceId=$routeParams.sourceId;
	$scope.customId=$routeParams.customId;
	console.log('getting some articles',$scope.articles);





  });
