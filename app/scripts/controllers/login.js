
angular.module('demoWebAppApp')
	.controller('LoginCtrl', function ($scope, $location) {
		$scope.login = function() {
			$location.path( '/main' );
		};
	});