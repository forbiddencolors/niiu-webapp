'use strict';

angular.module('niiuWebappApp')
  .factory('niiuAuthenticator', ['$rootScope', '$http', 'constants', function ($rootScope, $http, constants) {
    // Service logic
    // ...

    

    // Public API here
    return {


    changeUser: function(user) {
        //angular.extend(currentUser, user);
        var newUser = user || null;
        $rootScope.user=newUser;
        $rootScope.$apply();

        
              if (newUser=== null) {
                  console.log('user has logged out');
              } else if (newUser.firstName) {
                console.log('changing to user '+newUser.firstName);
              } else {
                console.log('changing to user ');
                console.log(newUser);
              }

          if ( newUser === null ) {
              return 0;
              
            } else {
              return newUser.contentProfile.id;
            }

        
    },

      authorize: function(accessLevel, role) {
          if(role === undefined) {
              role = currentUser.role;
          }


          return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function(user) {
          if(user === undefined) {
              user = currentUser;
          }
          return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      forgotPassword: function(email) {
        
        var passwordReset = new Object();
        passwordReset.api="user";
        passwordReset.action="forgot_password";
        passwordReset.appGuid=constants.NIIU_APP_GUID;

        var emailReset = {"eMail" : email};
        passwordReset.data=emailReset;
        $http.post(constants.NIIUAPI_URL + '/users/forgot_password', "data="+angular.toJson(passwordReset)).success(function(resetResponse) {
                console.log(resetResponse.contents.status);
                if (resetResponse.contents.status==200) {
                    console.log("Yea! check your email, your reset is being sent ");
                    console.log(resetResponse.contents.data);
                } else {
                  console.log("sorry that didn't work at all");
                  console.log(resetResponse);
                }
        });
          

      },
    register: function(user, success, error) {
                console.log('trying to register');

                console.log(user);
                var userReg = new Object();
                userReg.api="user";
                userReg.action="register";
                userReg.appGuid=constants.NIIU_APP_GUID;
                userReg.data=user;

                console.log('posting')
                $http.post(constants.NIIUAPI_URL + '/users/register', "data="+angular.toJson(userReg)).success(function(regData) {
                console.log(regData.contents.status);
                console.log("Yeah youre registered! ");
                console.log(regData.contents.data);

                    var newUser = regData.contents.data;
                    var userRole = new Object();

                    newUser.username=newUser.firstName;
                    newUser.role={"bitMask":2,"title":"user"}
                    newUser.connected=true;
                    changeUser(newUser);
                    success();
                }).error(error);
            },
            logout: function(user) {
               changeUser();
               console.log('just logged out');

               db=localDB.init;
               db.deleteLocalUser();

              //return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
            },
      
            login: function(user, success, error) {
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


                $http.post(constants.NIIUAPI_URL+'/users/authenticate', "data="+angular.toJson(loginReq), {
                    
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
                        
                        
                        changeUser(newUser);
                    //changeUser(user);
                    success(newUser);
                    } else {
                            console.log(error);
                            //error(error);
                    }

                }).error(error);

            }





    };
  }]);
