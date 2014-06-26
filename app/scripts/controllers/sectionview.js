'use strict';

angular.module('niiuWebappApp')
  .controller('SectionviewCtrl', function ($scope, User, $routeParams, constants) {

	$scope.currentSection = User.getCurrentSection();
	$scope.media_path=constants.ARTICLE_MEDIA_PATH;
	//$scope.logo_path=constants.SOURCE_LOGO_PATH;


	User.getContentObject().then(function(contentObjArray) {



	$scope.pageContent = contentObjArray[$routeParams.contentObjId];
	$scope.logo_path=$scope.pageContent.custom_section.id===null ? constants.SOURCE_LOGO_PATH : "";
	
	console.log('This page scope is ', $scope.pageContent );

	}
	);




  });
