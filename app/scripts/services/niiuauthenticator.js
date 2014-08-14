'use strict';

angular.module('niiuWebappApp')
  .factory('niiuAuthenticator', ['$rootScope', '$http', '$location', '$q', 'constants', 'localDB', 'User', function ($rootScope, $http, $location, $q, constants, localDB, User) {
    // Service logic
    // ...
    function setUser(user) {
        //angular.extend(currentUser, user);
        var newUser = user || null;
        $rootScope.user=newUser;
        //$rootScope.$apply();
        User.setUser(newUser);
        

        
              if (newUser=== null) {
                  console.log('user has logged out');
                  delete $rootScope.user;
                  User.deleteUser();

              } else if (newUser.firstName) {
                console.log('changing to user '+newUser.firstName);
              } else {
                console.log('changing to user ', newUser);
                
              }

          if ( newUser === null ) {
              User.deleteUser();
              localDB.deleteLocalUser()
                //$location.path('/');
                
               // redirect back to login
               
              return false;

              
            } else {
              localDB.storeUser(newUser);
              return newUser.contentProfile.id;
            }

        
    }

    

    // Public API here
    return {

      changeUser: function(user) {
        return setUser(user);

      },
    

      authorize: function(accessLevel, role) {
          if(role === undefined) {
              role = currentUser.role;
          }


          return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function() {
          /*
          if(user === undefined) {
              user = currentUser;
          }
          */
          console.log('types ofs');
          console.log(typeof $rootScope.user );
         // console.log( user.hasOwnProperty('id'));
          if ( typeof $rootScope.user == "object")  {
              console.log('you are logged in!');
              console.log('typeof user was ',(typeof user));
              //console.log(typeof user);
              return true;
              //return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
              //return 
          } else {
            console.log('we arent logged in. typeof user was ', typeof(user));
              console.log(typeof user);
            return false;
          }
          
      },
      forgotPassword: function(email) {
        
        var passwordReset = new Object();
        var deferred = $q.defer();

        passwordReset.api="user";
        passwordReset.action="forgot_password";
        passwordReset.appGuid=constants.NIIU_APP_GUID;

        var emailReset = {"eMail" : email};
        passwordReset.data=emailReset;
        $http.post(constants.NIIU_API_URL + 'users/forgot_password', "data="+angular.toJson(passwordReset)).success(function(resetResponse) {
                console.log(resetResponse.contents.status);
                if (resetResponse.contents.status==200) {
                    console.log("Yea! check your email, your reset is being sent ");
                    console.log(resetResponse.contents.data);
                    deferred.resolve(resetResponse);
                } else {
                  console.log("sorry that didn't work at all");
                  console.log(resetResponse);
                  deferred.reject(resetResponse.message);
                }
        });
          return deferred.promise;

      },
    register: function(user, success, error) {
                console.log('trying to register');

                console.log(user);
                var userReg = new Object();
                userReg.api="user";
                userReg.action="register";
                userReg.appGuid=constants.NIIU_APP_GUID;
                userReg.data=user;
                var deferred = $q.defer();

                console.log('posting', userReg)
                $http.post(constants.NIIU_API_URL + '/users/register', "data="+angular.toJson(userReg)).success(function(regData) {
                console.log(regData.contents.status);
                console.log("Yeah youre registered! ", regData.contents.data);
                

                    var newUser = regData.contents.data;
                    var userRole = new Object();

                    newUser.username=newUser.firstName;
                    newUser.role={"bitMask":2,"title":"user"}
                    newUser.connected=true;
                    setUser(newUser);
                    //success();
                    $location.path('/userHome');
                    deferred.resolve(newUser);

                }).error(function(error){
                    deferred.reject(error);
                 });
                  //hang on we don't have an answer yet
                return deferred.promise;
            },
            logout: function(user) {
               setUser(null);
               console.log('just logged out');

               //var db=localDB.init;
               localDB.deleteLocalUser().then(function(deleted_rows) {
                  console.log('removed user  from db');
                  $location.path('/');

               }

                );
               // redirect back to login
               

              //return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
            },
      
            login: function(user, success, error) {
                //create a promise
                var deferred = $q.defer();

                console.log('heres the loginInfo')
                console.log(user);
                var loginReq = new Object();
                loginReq.api="user";
                loginReq.action="authenticate";
                loginReq.appGuid=constants.NIIU_APP_GUID;
                loginReq.data=user;
                var loginReqString=angular.toJson(user);

                console.log('heres the login string');
                console.log(angular.toJson(loginReq));


                $http.post(constants.NIIU_API_URL+'users/authenticate', "data="+angular.toJson(loginReq), {
                    
                }).success(function(userData){
                    console.log('heres the response from the niiu api')
                    console.log(userData);
                    if (userData.contents.status==200) {

                        var newUser=userData.contents.data;
                        newUser.username=userData.contents.data.firstName+' '+userData.contents.data.lastName;
                        //newUser.role=userRoles.user;
                        if (newUser.contentProfile.isActive=='true') {
                          newUser.connected=true;
                        }
                        
                        // remove this
                        setUser(newUser);
/*
this is how we could chain a couple promises together to handle user logic

                        var getUserPromise = User.getUser();
                        var setUserPromise = User.setUser(newUser);
                        // Add this
                        $q.then(setUserPromise)
                          .then(getUserPromise)

*/

                        User.setUser(newUser).then(function() {
                          deferred.resolve(User.getUser());
                        }, function(error) {
                          // User.deleteUser();
                          // Redirect to "/"
                        });




                        $rootScope.error="";
                    //changeUser(newUser);
                    //success(newUser);
                    deferred.resolve(newUser);
                    
                    } else {
                            
                            console.log('that was an error...');
                            var error_message=userData.contents.message;
                            console.log(error_message);
                            //error=error_message;
                            //$rootScope.error=error_message;
                            deferred.reject(error_message);
                    }

                }).error(function(error){
                    deferred.reject(error);
                 });
                //hang on we don't have an answer yet
                return deferred.promise;

            }





    };
  }]);
