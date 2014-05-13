'use strict';

angular.module('niiuWebappApp')
  .controller('MainCtrl', ['$scope', 'niiuAuthenticator', '$rootScope', 'localDB', 'constants', function ($scope, niiuAuthenticator, $rootScope, localDB, constants ) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    


	//retrieve logged in user
    var user_table=localDB.init('niiu_user_table', constants.USER_TABLE_SCHEMA );

  	 	user_table.get('niiu_user', constants.USER_LOCATOR).done(function(localUser) {
              console.log('just checking that we can get the user from db');
              console.log(localUser);
              niiuAuthenticator.changeUser(localUser.userInfo);


             //console.log(constants);

	    }).fail(function(e) {
	      console.log('nobody in the DB')
	      throw e;
	    });






    $scope.logout =function(){
        niiuAuthenticator.changeUser();
    }





}]);
