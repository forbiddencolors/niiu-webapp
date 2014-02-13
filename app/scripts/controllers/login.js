
angular.module('demoWebAppApp')
	.controller('LoginCtrl', function ($scope, $location) {
		$scope.login = function() {
			console.log('here need to be logic for login');
			$location.path( '/main' );
		};
	});