'use strict';

angular.module('niiuWebappApp')
.controller('ForgotpassCtrl', ['$scope', '$rootScope', 'niiuAuthenticator',  function ($scope, $rootScope, niiuAuthenticator) {


$scope.forgotPass = function(email_address) {

	niiuAuthenticator.forgotPassword(email_address.eMail).then(function()  {
		$rootScope.error="Please check your email to reset your password.";

	});
	


}




  }]);
