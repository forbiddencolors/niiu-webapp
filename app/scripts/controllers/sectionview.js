'use strict';

angular.module('niiuWebappApp')
  .controller('SectionviewCtrl', function ($scope, User, $routeParams, $location, constants) {

	$scope.currentSection = User.getCurrentSection();
	$scope.media_path=constants.ARTICLE_MEDIA_PATH;


	//$scope.logo_path=constants.SOURCE_LOGO_PATH;

	$scope.sectionSwipe = function() {
  
    	console.log('user swiped to ', User.getNextSectionUrl($location.path()));
  
    	
    	$location.path("/sectionView/"+User.getNextSection());


    };


	User.getContentObject().then(function(contentObjArray) {



	$scope.pageContent = contentObjArray[$routeParams.contentObjId];
	$scope.logo_path=$scope.pageContent.custom_section.id===null ? constants.SOURCE_LOGO_PATH : "";
	$scope.pageClass = $scope.pageContent.type === "titlePage" ? "userHome" : "sectionPage";
	console.log('the pageClass is ',$scope.pageClass);
	
	console.log('This page scope is ', $scope.pageContent );

	


	}
	);




  });
