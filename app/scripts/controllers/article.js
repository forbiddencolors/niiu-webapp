
angular.module('demoWebAppApp')
.controller('ArticleCtrl',  ['$scope','$location','$routeParams' ,function ($scope, $location, $routeParams) {


	 // open pouch db section
    var db = PouchDB('Articles11.3');

	$scope.article

	var articleID = $routeParams.id;


	db.get( articleID, function(err, doc) { 

	    $scope.article = [ doc ];
	    console.log(doc)

	    // apply data to scope
		$scope.$apply();
	    
	});


}]);