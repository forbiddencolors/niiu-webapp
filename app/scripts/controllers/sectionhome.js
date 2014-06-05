'use strict';

angular.module('niiuWebappApp')
  .controller('SectionhomeCtrl', function ($scope,$routeParams,Articleservice,constants) {

	$scope.articles=Articleservice.getArticles();
	$scope.sectionId=$routeParams.sectionId;
	$scope.sourceId=$routeParams.sourceId;
	$scope.customId=$routeParams.customId;
	console.log('getting some articles',$scope.articles);
	$scope.media_path=constants.ARTICLE_MEDIA_PATH;



  });
