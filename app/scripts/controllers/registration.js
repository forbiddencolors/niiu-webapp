'use strict';

angular.module('niiuWebappApp')
  .controller('RegistrationCtrl' , ['$scope', 'niiuAuthenticator', 'localDB','constants', function ($scope, $rootScope, localDB, constants, niiuAuthenticator) {

  	//console.log(localDB);
  	//localDB.get(10210);

    console.log(niiuAuthenticator.changeUser)
    var user_table=localDB.init('niiu_user_table', constants.USER_TABLE_SCHEMA );

  	 user_table.get('niiu_user', 10210).done(function(localUser) {
              console.log('just checking that we can get the user from db');
              console.log(localUser);
              niiuAuthenticator.changeUser(localUser.userInfo);

            }).fail(function(e) {
              console.log('wtf happened to the user from db4')
              throw e;
            });


    var another_table = localDB.init()
    console.log(another_table)

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



  }]);
