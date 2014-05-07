var app = angular.module('plunker', []);


 //register a constant object with some constants
app.value('constants', {
               TWITTER_CONSUMER_KEY: 'z68u41jMxQIfWc6XxpMWBMAlw',
                TWITTER_CONSUMER_SECRET: 'Ja1rg57feAN0RVJiIWiNYNr4fSM2vuTf9pd4iVzXf9J035pQmm',
                FACEBOOK_APP_ID: '642106902524261',
                FACEBOOK_APP_SECRET: '3698a3cdf3071e66de86ce201a5e2ca4',
                NIIU_APP_GUID : '3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
                NIIUAPI_URL : 'http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de/' ,
                USER_LOCATOR : 90210

});



/*
app.config(['$routeProvider', function($routeProvider) {
    // application config here, maybe define some routes?
    $routeProvider.when('/entity/:id', {templateUrl: 'partials/template.html', controller: 'EntityCtrl'});    
})
.run(['$rootScope', '$injector', function($rootScope,$injector) {
    $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
        if ($rootScope.oauth) headersGetter()['Authorization'] = "Bearer "+$rootScope.oauth.access_token;
        if (data) {
            return angular.toJson(data);
        }
    };
});

*/



app.controller('MainCtrl', function($scope, $rootScope, Facebook, constants) {


/*
  $rootScope.TWITTER_CONSUMER_KEY = 'z68u41jMxQIfWc6XxpMWBMAlw';
  $rootScope.TWITTER_CONSUMER_SECRET = 'Ja1rg57feAN0RVJiIWiNYNr4fSM2vuTf9pd4iVzXf9J035pQmm';
  $rootScope.FACEBOOK_APP_ID = '642106902524261';
  $rootScope.FACEBOOK_APP_SECRET = '3698a3cdf3071e66de86ce201a5e2ca4';
  $rootScope.NIIU_APP_GUID = '3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c'; 
*/


  $scope.fb_logout = function() {
    console.log('trying to logout')
    //console.log(Facebook);
   // FB.logout();
   var socialUser = Facebook.dropUser(FB);
   $scope.user = socialUser;

   var db = new ydn.db.Storage('niiu_user_table');


   console.log(db);
   db.clear('niiu_user_table');
   console.log(db);
   console.log(ydn.db.Storage);

/*
    FB.logout(function(response) {
      // user is now logged out
      console.log('logged out. user is now...');
      console.log(response);
      console.log( $scope.user);
      //window.reload();


    });
*/
    

  }


  $scope.db_clear = function() {
    var db = new ydn.db.Storage('niiu_user_table');
    console.log(db);
    //db.clear();
    db.deleteDatabase('niiu_user_table');

    //console.log(db);
  }

  $scope.db_check = function() {
    //var db = new ydn.db.Storage('niiu_user_table');

    console.log('heres the DB from the rootScope');
    console.log($rootScope.db);
    $rootScope.db.values('niiu_user').done(function(records) {
      console.log(records);
    });
//    userObject= db.get('niiu_user',10210);
db2 = new ydn.db.Storage('db-name');
              db2.put('store-name', {message: 'Hello world!'}, 10210);
              db2.get('store-name', 10210).always(function(record) {
                console.log('heres id1 in db2');
                console.log(record);
              });

console.log('hopefully we still have access to db3');
console.log($rootScope.db3);

var dupeDb= new ydn.db.Storage('niiu_user_table');

dupeDb.values('niiu_user',[10210]).done(function(records) {
  console.log('im getting these records by values with a new DB object');
  console.log(records);

});


 /*
$rootScope.db3
              $rootScope.db3.put('niiu_user', { userInfo: niiu_user_obj}, 10210);
              $rootScope.db3.get('niiu_user', 10210).always(function(record) {
                console.log('heres the user in db3');
                console.log(record);
              });

  */

    //console.log(db.get(constants.USER_LOCATOR));

    //Since we are only going to have one users data in the 
    //application at a time we will refer to this as user 0

    //db.get('niiu_user', '033231333231').always(function(userObject) {
    $rootScope.db.get("niiu_user", 10210).always(function(userObject) {
      
      //console.log('we got the userinfo');
      //console.log(record);

    console.log('Heres the record from the DB');
    console.log(userObject);
    console.log("Heres the data in the in the record");
    console.log(userObject.userInfo);
    console.log("Heres the token from the object");
    console.log(userObject.userInfo.fbAccessToken);


      //record
      //console.log(record.userInfo.firstName+"'s user Db");


    });

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


console.log("does db.from work?");
  $rootScope.db.from("niiu_user").where('user', '=', 10210).done(function(records) {
  console.log("Im getting these records using db.from on the old DB object");
  console.log(records);
}, function(e) {
  console.log("Getting records via db.from didn't work because of ");
  console.log(e)
  //throw e;
});



    //console.log(user_name+"'s user Db");
   // db.clear();
    //console.log(db);
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
      console.log('FB data prepared for niiu Authentication');
      console.log($scope.niiuUser);
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







app.service('Facebook', function($q, $rootScope, $http, constants) {
  
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
        } else if (response.status == 'not_authorized' || 'unknown') {
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
    var fbBirthDate = new Date(scopeUser.birthday);
    var niiuBirthDate = fbBirthDate.getFullYear()+"-"+(fbBirthDate.getMonth()+1)+"-"+fbBirthDate.getDate();
    console.log('niiu birthdate is '+niiuBirthDate);

      var niiuAuthData = {



        "birthDate": niiuBirthDate,
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
        data : niiuAuthData
        
      }


      $http.post( constants.NIIUAPI_URL + 'users/social_login' , "data="+angular.toJson(niiuAuthObj), 
                  {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}} 
      ).
        success(function (data, status, headers, config) {
          // Hey the server accepted my post
          console.log('this is the authentication response from the niiu api');
          console.log(data.contents.data);
          console.log('lets save this for later');

            var schema = {
              stores:[{
                name:'niiu_user',
                keyPath:"user"
              }]
            };


            




          $rootScope.db = new ydn.db.Storage('niiu_user_table',schema);
          var niiu_user_obj=data.contents.data;
          console.log(niiu_user_obj.id);
          // ["id", "firstName", "lastName", "eMail", "birthDate", "fbID", "fbAccessToken", "gender", "apiKey", "lastUpdated", "contentProfile", "subscription", "newRegistration"] 
          //db.put(array('id','firstName','lastName','eMail','fbID','fbAccessToken','apiKey','lastUpdated','contentProfile','subscription','newRegistration'), 
          //        array(niiu_user_obj.id,niiu_user_obj.firstName,niiu_user_obj.lastName,niiu_user_obj.eMail,niiu_user_obj.fbID,niiu_user_obj.fbAccessToken,niiu_user_obj.apiKey,niiu_user_obj.lastUpdated,niiu_user_obj.contentProfile,niiu_user_obj.subscription,niiu_user_obj.newRegistration));
          
         // db2.put('store-name', {message: 'Hello world!'}, 'id1');


          $rootScope.db.put({name:'niiu_user', keyPath:'user'}, {user: 10210, userInfo: niiu_user_obj});



         $rootScope.db3 = new ydn.db.Storage('db-three');
              $rootScope.db3.put('niiu_user', { userInfo: niiu_user_obj}, 10210);
              $rootScope.db3.get('niiu_user', 10210).always(function(record) {
                console.log('heres the user in db3');
                console.log(record);
              });
          /*db.put({name:'niiu_user', keyPath: 'apiKey'}, {'apiKey': niiu_user_obj.apiKey});
          db.put({name:'niiu_user' , keyPath: 'firstName'}, {'firstName' : niiu_user_obj.firstName });
          db.put({name:'niiu_user', keyPath: 'lastName'}, {'lastName' : niiu_user_obj.lastName});
          db.put({name:'niiu_user' , keyPath: 'eMail'}, {'eMail' : niiu_user_obj.eMail});
          db.put({name:'niiu_user' , keyPath:  'fbID'}, {'fbID' : niiu_user_obj.fbID});
          db.put({name:'niiu_user' , keyPath: 'fbAccessToken'}, {'fbAccessToken' : niiu_user_obj.fbAccessToken});
          */


          //db.put('sections', objectData, objectData.id );
          //db.put({name: 'sections', keyPath: '_id'}, objectData);


          //db.auth = data.data;
          //console.log(data.data);

      }).
        error(function (data, status, headers, config) {
          // ...
      });




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

