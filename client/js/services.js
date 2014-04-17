'use strict';

angular.module('angular-client-side-auth')
.factory('Auth', function($http, $cookieStore){

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
            $http.post('/register', user).success(function(res) {
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


            $http.post(apiUrl+'/users/authenticate', "data="+angular.toJson(loginReq)).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);



            $http.post(apiUrl+'/users/authenticate', "data="+angular.toJson(loginReq), {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
              //,
              //transformRequest: function(data) { 
                //console.log("ran the function got the data");
                //console.log(data);
                //return data;

               //  }
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
.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
});
