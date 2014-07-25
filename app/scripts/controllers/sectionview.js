'use strict';

angular.module('niiuWebappApp')
  .controller('SectionviewCtrl', function ($scope, User, $routeParams, $location, $window, constants) {

	$window.scrollTo(0,0);
	$scope.currentSection = User.getCurrentSection();
	$scope.media_path=constants.ARTICLE_MEDIA_PATH;


	//$scope.logo_path=constants.SOURCE_LOGO_PATH;

	$scope.nextSectionSwipe = function() {
  
    	console.log('user swiped to ', User.getNextSectionUrl($location.path()));
  
    	$location.path("/sectionView/"+User.getNextSection());
    	


    };

    $scope.previousSectionSwipe = function() {
  		
  		var previousSection=User.getPreviousSection();
    	console.log('user swiped back to section',previousSection );
  		
    	$location.path("/sectionView/"+previousSection);
    	


    };

    $scope.toggleMenu = function(onOff) {
    	User.toggleMenu(onOff);

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
