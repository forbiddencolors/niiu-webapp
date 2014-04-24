'use strict';

angular.module('angular-client-side-auth')
.factory('Auth', function($http, $cookieStore, constants){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };
    var apiUrl='http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de';
    //var apiUrl='http://kirkthedev.com/niiu/request_dump.php?url=http://dev.niiu.de';
    //var apiUrl='http://kirkthedev.com/niiu/xparent.php?url=http://dev.niiu.de';
    //var apiUrl='http://dev.niiu.de';
    //var apiUrl='http://kirkthedev.com/niiu/request_dump.php';
    

    $cookieStore.remove('user');

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
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
        register: function(user, success, error) {
            console.log("the app guid is "+constants.NIIU_APP_GUID);
            var userReg = new Object();
            userReg.api="user";
            userReg.action="register";
            userReg.appGuid=constants.NIIU_APP_GUID;
            userReg.data=user;

            $http.post(apiUrl + '/users/register', "data="+angular.toJson(userReg)).success(function(res) {
                changeUser(res);
                success();
            }).error(error);
        },
        login: function(user, success, error) {
            console.log(user);
            var loginReq = new Object();
            loginReq.api="user";
            loginReq.action="authenticate";
            loginReq.appGuid="3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c";
            loginReq.data=user;
            var loginReqString=angular.toJson(user);

/*
            $http.post(apiUrl+'/users/authenticate', "data="+angular.toJson(loginReq)).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
*/


            $http.post(apiUrl+'/users/authenticate', "data="+angular.toJson(loginReq), {
              //headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
              //,
              //transformRequest: function(data) { 
                //console.log("ran the function got the data");
                //console.log(data);
                //return data;

               //  }
            }).success(function(userData){
                console.log(userData);
                if (userData.contents.status==200) {
                    var newUser=userData.contents.data;
                    newUser.username=userData.contents.data.firstName+' '+userData.contents.data.lastName;
                    newUser.role=userRoles.user;
                    
                    changeUser(newUser);
                //changeUser(user);
                success(newUser);
                } else {
                        //console.log(error);
                        error(error);
                }

            }).error(error);

        },
    /*

        login: function(user, success, error) {
            $http.post('/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },


        login: function(user, success, error) {
            console.log(user);
            var loginReq = new Object();
            loginReq.api="user";
            loginReq.action="authenticate";
            loginReq.appGuid="3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c";
            loginReq.data=user;
            //console.log(loginReq);


            var userReq = new Object();
            userReq = {'api':'user','action':'authentication','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
            'data':{
            'eMail': 'kirk@niiu.de',
            'password':'y0Xijiti'
            }
            };
            var apidata_userReq="data="+JSON.stringify(userReq);


            console.log(userReq);

        var payload = new FormData();
        // populate payload
        payload = {'api':'user','action':'authentication','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
            'data':{
            'eMail': 'kirk@niiu.de',
            'password':'y0Xijiti'}};
            var stringLoad=JSON.stringify(payload);
            var postData="data="+stringLoad;

    
        //hardcoded but working
        $http.post(apiUrl+'/users/authenticate', postData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(data) { 
            console.log(data);
            return data;

             }
        });
        

            $http.post(apiUrl+'/users/authenticate', apidata_userReq, { headers: { 'Content-Type': false },transformRequest: function(userback) {
                console.log('login function');
                console.log(userback);
                changeUser(userback);
                success(user);
            }}).error(error);
        
        },
*/


    



        logout: function(success, error) {
            $http.post('/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});

angular.module('angular-client-side-auth')
.factory('uuid', function() {
    var svc = {
        new: function() {
            function _p8(s) {
                var p = (Math.random().toString(16)+"000000000").substr(2,8);
                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        },

        empty: function() {
          return '00000000-0000-0000-0000-000000000000';
        }
    };

    return svc;
});

//register a constant object with some constants
angular.module('angular-client-side-auth')
.value('constants', {
               TWITTER_CONSUMER_KEY: 'z68u41jMxQIfWc6XxpMWBMAlw',
                TWITTER_CONSUMER_SECRET: 'Ja1rg57feAN0RVJiIWiNYNr4fSM2vuTf9pd4iVzXf9J035pQmm',
                FACEBOOK_APP_ID: '642106902524261',
                FACEBOOK_APP_SECRET: '3698a3cdf3071e66de86ce201a5e2ca4',
                NIIU_APP_GUID : '3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c' 

});



angular.module('angular-client-side-auth')
.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
});
