'use strict';

angular.module('niiuWebappApp')
  .controller('RegistrationCtrl' , ['$scope', 'niiuAuthenticator', '$rootScope', 'localDB', 'constants', function ($scope, niiuAuthenticator, $rootScope, localDB, constants ) {

    $scope.pageClass="registration";

    //see if we have a users information in the DB
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


    var another_table = localDB.init()
    console.log(another_table);
    var injectionTest = niiuAuthenticator;
    console.log(injectionTest);


    $scope.logout =function(){
        niiuAuthenticator.changeUser();
    }


$scope.niiu_register = function(regInfo) {
    console.log('Niiu Registration!');
    console.log('the registration stuff is');



    niiuAuthenticator.register(regInfo).then(function(result) {
      niiuRegObject = result;
      console.log('this is a newly registered user');
      console.log(result);
    

    });
}




  }]);
