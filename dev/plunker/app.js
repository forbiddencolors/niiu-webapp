var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, Facebook) {


  $scope.user = Facebook.getUser(FB);

}); 



app.service('Facebook', function($q, $rootScope) {
  
     FB.init({
      appId      : '642106902524261',     
      status     : true,                              
      xfbml      : true 
    });


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
        deferred.resolve(retval);
      }
    });
  }
    
  return {
    getUser: function(FB) {




      var deferred = $q.defer();
      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          FB.api('/me', function(response) {
            resolve(null, response, deferred);
          });
        } else if (response.status == 'not_authorized') {

          console.log('not logged in yet');
          FB.login(function(response) {
            if (response.authResponse) {
              FB.api('/me', function(response) {
                resolve(null, response, deferred);
              });
            } else {
              resolve(response.error, null, deferred);
            }
          });
        } 
      });
      promise = deferred.promise;
      promise.connected = false;
      return promise;
    }
  }; 
});


/* Controllers */

app.controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    // define a constant
    //$scope.constant('app_guid', '3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c');

    $scope.logout = function() {
        Auth.logout(function() {
            $location.path('/login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
}]);


app.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$window',  function($rootScope, $scope, $location, $window) {

    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
                "eMail": $scope.eMail,
                "password": $scope.password
                //rememberme: $scope.rememberme
            },
            function(res) {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = "Failed to login";
            });
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };

$scope.ya = function() {
  //fb_login();
  alert('ya');
}

  $scope.fb_login = function(){
    alert ('someone running fb_login!');

      }

$scope.fb_logno = function() {
    

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
  (function() {
     console.log('adding script');
      var e = document.createElement('script');
      e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
      e.async = false;
      document.getElementById('fb-root').appendChild(e);
      //console.log(document.getElementById('fb-root').innerHTML);
      
  }());

 








}]);



app.controller('RegisterCtrl',
['$rootScope', '$scope', '$location', 'uuid', 'constants' ,'Auth', function($rootScope, $scope, $location, uuid, constants, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;
    
    console.log(constants.NIIU_APP_GUID);

    $scope.register = function() {
        
        //var thisUuid = uuid.new();
        //console.log(thisUuid);
        Auth.register({
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                username: $scope.firstName+"_"+$scope.lastName,
                eMail: $scope.eMail,
                password: $scope.password,
                appGuid: constants.NIIU_APP_GUID,
                deviceID: "browser_"+uuid.new(), 


                role: $scope.role
            },
            function() {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = err;
            });
    };
}]);


app.controller('AdminCtrl',
['$rootScope', '$scope', 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Users.getAll(function(res) {
        $scope.users = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch users.";
        $scope.loading = false;
    });

}]);

