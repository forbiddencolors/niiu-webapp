'use strict';

angular.module('niiuWebappApp')
  .controller('EmailloginCtrl', ['$scope', '$location', 'niiuAuthenticator', 'constants', function ($scope, $location, niiuAuthenticator, constants) {

    // add page class
  $scope.pageClass = 'login-email';

  console.log('what does my scope look like ' , $scope);  

  $scope.niiu_login = function(loginInfo) {
    console.log('Niiu Login!');
    console.log('the login stuff is');
    console.log(loginInfo.eMail);

    console.log(constants);

    console.log(niiuAuthenticator);


    
    var niiuUser = niiuAuthenticator.login(loginInfo).then(function(result) {
      var niiuObject = result;
      console.log('lets resolve niiu user');
      console.log(niiuObject);
      // redirect back to login
      $location.path('/userHome');

      //$scope.niiuUser=Facebook.niiuAuth(socialObject,$scope.auth);
      //console.log('FB data prepared for niiu Authentication');
      //console.log($scope.niiuUser);
    });


    
    //console.log(niiuUser);


    /*
    //console.log(FB.getAuthResponse());
    //$scope.auth = FB.getAuthResponse();
    console.log('heres the current auth');
    console.log($scope.auth);


    var loginObject = new Object();
    niiuUser.then(function(result) {

      console.log('niiu authenticator response');
      console.log(result);
      loginObject=result;
      //$scope.user = result;

    }
    */
  

    //var socialObject= new Object();

    //get the faceBook information out of a promise
    
    
},

$scope.niiu_forgot = function(emailInfo) {
    console.log('Niiu Reset!');
    console.log('the reset info');
    console.log(emailInfo.eMail);

    var niiuUser = niiuAuthenticator.forgotPassword(emailInfo.eMail);
    
    
    niiuUser.then(function(result) {
      niiuObject = result;
      console.log('We got a response back, I wonder if the password was really reset');
      console.log(result);
      return result;

    });

  }

}]);

