'use strict';

angular.module('niiuWebappApp')
  .controller('SectionviewCtrl', function ($scope, $animate, User, $routeParams, $location, $window, constants) {

	$window.scrollTo(0,0);
	
	$scope.currentSection = User.getCurrentSection();
	$scope.media_path=constants.ARTICLE_MEDIA_PATH;


	
  console.log('the logo path is ',$scope.logo_path);

	$scope.nextSectionSwipe = function() {
  
    	console.log('user swiped to ', User.getNextSectionUrl($location.path()));
  
    	$location.path("/sectionView/"+User.getNextSection());
    	


    };

    $scope.previousSectionSwipe = function() {
  		
  		var previousSection=User.getPreviousSection();
    	console.log('user swiped back to section',previousSection );
  		angular.element('.page').addClass('backswipe');
    	$location.path("/sectionView/"+previousSection);
    	


    };


    $scope.toggleMenu = function(onOff) {
    	User.toggleMenu(onOff);

    };

    $scope.getLogoPath=function() {
      return constants.SOURCE_LOGO_PATH;
    }

    $scope.goSection = function(sectionId) {

      User.setCurrentSection(sectionId);
     // $location.path("/sectionView/"+sectionId); //this could happen in the set function too.
    };

	User.getContentObject().then(function(contentObjArray) {



	$scope.pageContent = contentObjArray[$routeParams.contentObjId];
  $scope.contentObject=contentObjArray;
	$scope.logo_path=$scope.pageContent.custom_section.id===null ? constants.SOURCE_LOGO_PATH : "";
	$scope.pageClass = $scope.pageContent.type === "titlePage" ? "userHome" : "sectionPage";
	console.log('the pageClass is ',$scope.pageClass);
	
	console.log('This page scope is ', $scope.pageContent );

	


	}
	);




  });
