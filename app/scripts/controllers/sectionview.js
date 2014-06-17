'use strict';

angular.module('niiuWebappApp')
  .controller('SectionviewCtrl', function ($scope, User, $routeParams) {

	$scope.currentSection = User.getCurrentSection();



	User.getContentObject().then(function(contentObjArray) {



	$scope.pageContent = contentObjArray[User.getCurrentSection()];
	console.log('This page scope is ', $scope.pageContent );

	}
	);




  });
