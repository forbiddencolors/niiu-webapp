'use strict';

angular.module('niiuWebappApp')
  .controller('MainCtrl', ['$scope', '$location','niiuAuthenticator', 'Facebook', '$rootScope', 'localDB', 'constants', function ($scope, $location, niiuAuthenticator, Facebook, $rootScope, localDB, constants ) {

        // Add the page class
    $scope.pageClass = 'login-home';

$scope.retrieveUser = function() {
  	//retrieve logged in user
    var  priorUser=localDB.getLastUser().then(function(priorUser) {

      console.log('we do have a prior user', priorUser);
      niiuAuthenticator.changeUser(priorUser) ;
      $location.path('/userHome');
    }

    ).catch( function(e) {
      console.log('we didnt find a user in the db because ',e);
      $scope.error=e;
    });

}
$scope.retrieveUser();

$scope.showModal = function(url) {
$dialog.dialog({}).open(url);  
}



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






}])

.run(['$rootScope', function($rootScope) {
  
  //console.log('should run the function here ',  $rootScope);
    //$rootScope.retrieveUser();
    //$scope.retrieveUser();
  }
]);




