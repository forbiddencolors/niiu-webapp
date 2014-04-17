'use strict';

angular.module('angular-client-side-auth')
.factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };
    //var apiUrl='http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de';
    //var apiUrl='http://kirkthedev.com/niiu/request_dump.php?url=http://dev.niiu.de';
    //var apiUrl='http://kirkthedev.com/niiu/xparent.php?url=http://dev.niiu.de';
    var apiUrl='http://dev.niiu.de';
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
            //console.log(loginReq);


            var userReq = new Object();
            userReq = {'api':'user','action':'authentication','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
            'data':{
            'eMail': 'kirk@niiu.de',
            'password':'y0Xijiti'
            }
            };


            console.log(userReq);

        var payload = new FormData();
        // populate payload
        payload = {'api':'user','action':'authentication','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
            'data':{
            'eMail': 'kirk@niiu.de',
            'password':'y0Xijiti'}};
            var stringLoad=JSON.stringify(payload);
            var postData="data="+stringLoad;

            

        $http.post(apiUrl+'/users/authenticate', postData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(data) { 
            console.log(data);
            return data;

             }
        });

/*
            $http.post(apiUrl+'/users/authenticate', userReq, { headers: { 'Content-Type': false },transformRequest: function(userback) {
                console.log('login function');
                console.log(userback);
                changeUser(userback);
                success(user);
            }}).error(error);
        */

/*



                ).success(function(userback){
                console.log('login function');
                console.log(userback);
                changeUser(userback);
                success(user);
            }).error(error);
*/

        var SectionObject = {'api':'3s','action':'sync','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
        'data':{
            'lastSync':'2014-04-11 02:00:00',
            'sections':[],
            'sources':[],
            'subsections':[],
            'sections_subsections':[],
            'sources_sections':[],
            'sources_subsections':[]
            }
        };

        getSectionData(SectionObject);

/*
            $http({
                method: 'POST',
                url: apiUrl+'/users/authenticate',
                data: loginReq,
                
            });
*/
//var getSectionUrl = 'http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de/articles/sync_3s';
// engine for getting data from api
    function getSectionData(DataObject) {
        // stringify json data object
        var jsonString = JSON.stringify(DataObject);
        // put string in object with key = data
        var getSectionData = JSON.stringify({data:jsonString});
        var getSectionUrl = 'http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de/articles/sync_3s';






        // get section data from api
        $http.post(getSectionUrl, getSectionData, function(data){
            if (data) {

                var Sections = data.contents.data.newSections;

                $scope.sections = Sections;

                console.log('here is the section scope');
                console.log($scope.sections)

                // apply data to scope
                $scope.$apply();

                // call function add to database and add data to local DB
               // addSection(Sections);

            }
        }, 'json');

    }
    


        },
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
