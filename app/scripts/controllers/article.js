
angular.module('demoWebAppApp')
.controller('ArticleCtrl',  ['$scope','$location','$routeParams' ,function ($scope, $location, $routeParams) {


	 // open ydn db section
	var db = new ydn.db.Storage('ydn-ArticlesTest');

	$scope.article = [];

	var articleID = $routeParams.id;
		console.log('we are looking for '+$routeParams.id);


	db.get('articles', articleID).done(function(data) {
		console.log(data);

	   $scope.article.push(data);
	   $scope.$apply();
	});



}]);
