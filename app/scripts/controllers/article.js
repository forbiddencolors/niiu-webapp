
angular.module('demoWebAppApp')
.controller('ArticleCtrl',  ['$scope','$location','$routeParams' ,function ($scope, $location, $routeParams) {


	 // open pouch db section
    var db = PouchDB('Articles13');

	$scope.article

	var articleID = $routeParams.id;
		console.log(articleID);

	db.get( articleID, function(err, doc) { 
		console.log(doc);
	    $scope.article = [ doc ];

	    // apply data to scope
		$scope.$apply();
	    
	});


}]);
