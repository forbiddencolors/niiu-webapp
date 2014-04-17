
angular.module('demoWebAppApp')
	.controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {
		$scope.login = function() {
			$location.path( '/main' );
		};
	}]);