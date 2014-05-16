'use strict';

angular.module('niiuWebappApp')
  .controller('MainCtrl', ['$scope', '$location', 'niiuAuthenticator', 'Facebook', '$rootScope', 'localDB', 'constants', function ($scope, $location, niiuAuthenticator, Facebook, $rootScope, localDB, constants ) {

    


	//retrieve logged in user
    var user_table=localDB.init('niiu_user_table', constants.USER_TABLE_SCHEMA );

  	 	user_table.get('niiu_user', constants.USER_LOCATOR).done(function(localUser) {

        if(localUser) {
              console.log('just checking that we can get the user from db');
              console.log(localUser);
              niiuAuthenticator.changeUser(localUser.userInfo);
            } else {
              console.log('nobody in the DB');
            }

             //console.log(constants);

	    }).fail(function(e) {
	      console.log('couldnt get anything from the DB');
	      throw e;
	    });






    $scope.logout =function(){
        niiuAuthenticator.changeUser();
    }




  $scope.db_clear = function() {
    var db = new ydn.db.Storage('niiu_user_table');
    console.log(db);
    //db.clear();
    db.deleteDatabase('niiu_user_table');

    //console.log(db);
  }

  $scope.fb_login = function() {


    console.log('DOIN IT!');
    //console.log(FB);
   // console.log(constants);

    console.log(Facebook)
    var socialUser = Facebook.getUser(FB)
    $scope.user = socialUser;
    console.log('fb auth response');
    console.log(FB.getAuthResponse());
    $scope.auth = FB.getAuthResponse();
    console.log('heres the current auth');
    console.log($scope.auth);

    //var socialObject= new Object();

    //get the faceBook information out of a promise
    socialUser.then(function(result) {
      var socialObject = result;
      console.log('lets resolve social user', socialObject);
      console.log(socialObject);


      $scope.niiuUser=Facebook.niiuAuth(socialObject,$scope.auth).then(function(){
          console.log('we should be moving to the userhome');
          $location.path('/userHome');
      });
      console.log('FB data prepared for niiu Authentication');
      console.log($scope.niiuUser);
      //$location.path('#/userHome');
    

    });
  }



/*

    if ($rootScope.db) {
      $rootScope.db.values('niiu_user',[10210]).done(function(records) {
        console.log('im getting these records by values with the scope DB object');
        console.log(records);
      });


      console.log("does executeSQL work?");
        $rootScope.db.executeSql("SELECT * FROM niiu_user WHERE 'user' = 10210").then(function(records) {
        console.log("Im getting these records using SQL on the new DB object");
        console.log(records);
      }, function(e) {
        console.log("Getting records via sql didn't work because of ");
        console.log(e)
        //throw e;
      });


    }


*/






}]);
