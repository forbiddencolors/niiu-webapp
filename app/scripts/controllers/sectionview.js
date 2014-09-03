'use strict';

angular.module('niiuWebappApp')
  .controller('SectionviewCtrl', function ($scope, $animate, User, $routeParams, $location, $window, constants) {

	$window.scrollTo(0,0);
	
	$scope.currentSection = User.getCurrentSection();
	$scope.media_path=constants.ARTICLE_MEDIA_PATH;
  $scope.stopClick=false;


	
  console.log('the logo path is ',$scope.logo_path);

	$scope.nextSectionSwipe = function() {
      $scope.stopClick=true;
    	console.log('user swiped forward to ', User.getNextSectionUrl($location.path()));
  
    	$location.path("/sectionView/"+User.getNextSection());
    	


    };

    $scope.previousSectionSwipe = function() {
      $scope.stopClick=true;
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
      $scope.stopClick=true;
      $location.path("/sectionView/"+sectionId); //this could happen in the set function too.
    };

    $scope.goArticle = function(id) {
      User.toggleMenu(false);
      if($scope.stopClick) {
        console.log('this click was stopped!');
          return;
      }
      console.log('this click was not stopped');
      $location.path('/article/'+id);

    }

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
