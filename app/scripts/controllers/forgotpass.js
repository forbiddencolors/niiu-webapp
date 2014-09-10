'use strict';

angular.module('niiuWebappApp')
.controller('ForgotpassCtrl', ['$scope', '$rootScope', 'niiuAuthenticator',  function ($scope, $rootScope, niiuAuthenticator) {

$scope.pageClass = "forgotPage";

$scope.forgotPass = function(email_address) {

	niiuAuthenticator.forgotPassword(email_address.eMail).then(function(response)  {
		console.log("ForgotPass successfuly says ",response);
		if(response.contents) {

			$scope.error=response.contents.message;
		} else {	
		$scope.error="Please check your eMail for instructions on resetting your password.<br><a href='/'>Home</a></p>";
		
		}


	}, function(response_error) {
		console.log("ForgotPass unsuccessfuly says ",response_error);
		$scope.error="Invalid Email address";
	});
	


}




  }]);
