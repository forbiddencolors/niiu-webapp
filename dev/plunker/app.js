var app = angular.module('plunker', []);


 //register a constant object with some constants
app.value('constants', {
               TWITTER_CONSUMER_KEY: 'z68u41jMxQIfWc6XxpMWBMAlw',
                TWITTER_CONSUMER_SECRET: 'Ja1rg57feAN0RVJiIWiNYNr4fSM2vuTf9pd4iVzXf9J035pQmm',
                FACEBOOK_APP_ID: '642106902524261',
                FACEBOOK_APP_SECRET: '3698a3cdf3071e66de86ce201a5e2ca4',
                NIIU_APP_GUID : '3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c' 

});

app.controller('MainCtrl', function($scope, Facebook, constants) {

  //$scope.user = Facebook.getUser(FB);

  $scope.fb_logout = function() {
    console.log('trying to logout')
    //console.log(Facebook);
   // FB.logout();
    FB.logout(function(response) {
      // user is now logged out
      console.log('logged out. user is now...');
      console.log(response);
      console.log( $scope.user);


    });
    

  }

  $scope.fb_login = function() {
    console.log('DOIN IT!');
    console.log(FB);
    console.log(constants);

    console.log(Facebook)
    var socialUser = Facebook.getUser(FB)
    $scope.user = socialUser;
    console.log('fb auth response');
    console.log(FB.getAuthResponse());
    $scope.auth = FB.getAuthResponse();
    console.log('heres the current auth');
    console.log($scope.auth);

    var socialObject= new Object();

    //get the faceBook information out of a promise
    socialUser.then(function(result) {
      socialObject = result;
      console.log('lets resolve social user');
      console.log(socialObject);
      $scope.niiuUser=Facebook.niiuAuth(socialObject,$scope.auth);
    });

    

    //send FB info to niiu
    

    //FB.login();
    //$scope.$apply();
   //console.log($scope.user.username)
   //console.log($scope.auth.signedRequest)
   


  }

  $scope.whatScope = function() {
      console.log($scope);
  }

}); 

app.service('Facebook', function($q, $rootScope, constants) {
  
  // resolving or rejecting a promise from a third-party
  // API such as Facebook must be
  // performed within $apply so that watchers get
  // notified of the change
  resolve = function(errval, retval, deferred) {
    $rootScope.$apply(function() {
      if (errval) {
        deferred.reject(errval);
      } else {
        retval.connected = true;
        console.log('heres the resolved response');
        console.log(retval);
        deferred.resolve(retval);
      }
    });
  }


    
  return {
    getUser: function(FB) {
      var deferred = $q.defer();
      FB.getLoginStatus(function(response) {
        console.log(response.status);
        if (response.status == 'connected') {
          FB.api('/me', function(response) {
            resolve(null, response, deferred);
            console.log("youre logged in and the response is: ");
            console.log(response);
          });
        } else if (response.status == 'not_authorized') {
              console.log("youre not logged in and the response is: ");
              console.log(response);
          FB.login(function(response) {
            if (response.authResponse) {
              var access_token =   FB.getAuthResponse()['accessToken'];
              console.log('the access token should be in the following response');
              console.log(FB.getAuthResponse());
              auth = FB.getAuthResponse();


              FB.api('/me', function(response) {
                resolve(null, response, deferred);
              });
            } else {
              console.log("it seems like you opted not to authorize");
              console.log(response);
              resolve(response.error, null, deferred);
            }
          }, {scope: ['basic_info','email','user_birthday']});
          
        } 
      });
      promise = deferred.promise;
      promise.connected = false;
      return promise;
    }
    ,
    dropUser: function(FB) {
      //empty so far
      console.log("the facebook object we want to logout is ");
      console.log(FB);
      FB.logout(function (response) {
        // this.getUser(FB);
        console.log(response);
      });
    } ,
    getAuth: function(FB) {
      $scope.auth = FB.getAuthResponse();

    }
    ,
    niiuAuth: function(scopeUser,scopeAuth) {
console.log('weve got some userscope');
console.log(scopeUser.birthday);
      
      var niiuAuthData = {
        "birthDate": scopeUser.birthday,
        "eMail": scopeUser.email,
        "fbAccessToken": scopeAuth.accessToken,
        "fbID": scopeUser.id,
        "firstName": scopeUser.first_name,
        "lastName": scopeUser.last_name,
        "gender": scopeUser.gender,
        
        "password": null




      }

      var niiuAuthObj = {
        action : "login",
        api : "user",
        appGuid : constants.NIIU_APP_GUID,
        data : niiuAuthData;
        
      }

      return niiuAuthObj;

    }


  }; 




});

/*

      FB.login(function(response) {

          if (response.authResponse) {
              console.log('Welcome!  Fetching your information.... ');
              //console.log(response); // dump complete info
              access_token = response.authResponse.accessToken; //get access token
              user_id = response.authResponse.userID; //get FB UID

              FB.api('/me', function(response) {
                  user_email = response.email; //get user email
            // you can store this data into your database             
              });

          } else {
              //user hit cancel button
              console.log('User cancelled login or did not fully authorize.');

          }
      }, {
          scope: 'basic_info, email, user_birthday'

      });


  


  }
 








}]);

*/

