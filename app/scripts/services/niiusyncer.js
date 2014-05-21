'use strict';

angular.module('niiuWebappApp')
  .factory('niiuSyncer',['$rootScope', '$http', '$q', 'constants','localDB', function ($rootScope, $http, $q, constants, localDB) {
    // Service logic
    // ...

    var currentUser = $rootScope.user;
    var last3SSync = {};

    var articleData = {
      "api": "content",
      "action": "get",
      "appGuid": constants.NIIU_APP_GUID,
      "apiKey": currentUser.apiKey,
      "data": {
          "last3SSync": "0000-00-00 00:00:00",
          "lastContentSync": "0000-00-00 00:00:00",
          "user_id": currentUser.contentProfile.userID,
         "version": 102.5,
         "article_ids": [ ],
         "contentProfile": {
             "id": currentUser.contentProfile.id,
             "localID": 2,
             "isPublic": 1,
             "name": "Default Content Profile",
             "subscribedTo": null,
            "lastUpdated": "0000-00-00 00:00:00",
            "items": [  ]
        },
        "forceSync": true
      }
    };




    var threeSData = {
      "api": "3s",
      "action": "sync",
      "appGuid": constants.NIIU_APP_GUID,
      "apiKey": currentUser.apiKey,
      "data": {
          "last3SSync": localDB.getLastSync(),
          "lastContentSync": "0000-00-00 00:00:00",
          "user_id": currentUser.contentProfile.userID,
         "version": 102.5,
         "article_ids": [ ],
         "contentProfile": {
             "id": currentUser.contentProfile.id,
             "localID": 2,
             "isPublic": 1,
             "name": "Default Content Profile",
             "subscribedTo": null,
            "lastUpdated": "0000-00-00 00:00:00",
            "items": [  ]
        },
        "forceSync": true
      }
    };    





    // Public API here
    return {
      syncProfile: function () {
        
      },

      syncArticles: function() {


        //create a promise
        var deferred = $q.defer();

        $http.post(constants.NIIUAPI_URL+"articles/get_articles", "data="+angular.toJson(articleData), {
                    
                }).success(function(articleResponse){
                    console.log('heres the response from the niiu api', articleResponse)
                    
                    if (articleResponse.contents.status==200) {

                        console.log('The response was good');
                        
                        
                        
                    
                    
                    deferred.resolve(articleResponse);
                    
                    } else {
                            
                            console.log('The response wasnt so good...', articleResponse);
                            
                            deferred.reject(articleResponse);
                    }

                }).error(function(error){
                    console.log('this was a straight up error',error);
                    deferred.reject(error);
                 });
                //hang on we don't have an answer yet
                return deferred.promise;

      },


      sync3s: function() {

        console.log('we have to do a 3s sync');
        //create a promise
        var deferred = $q.defer();

        $http.post(constants.NIIUAPI_URL+"articles/sync_3s", "data="+angular.toJson(threeSData), {
                    
                }).success(function(threeSResponse){
                    console.log('heres the response from the niiu api', threeSResponse)
                    
                    if (threeSResponse.contents.status==200) {

                        console.log('The 3s response was good')
                        
                        
                        
                    
                    
                    deferred.resolve(threeSResponse);
                    
                    } else {
                            
                            console.log('The 3s response wasnt so good...', threeSResponse);
                            
                            deferred.reject(threeSResponse);
                    }

                }).error(function(error){
                    console.log('this was a straight up 3s error',error);
                    deferred.reject(error);
                 });
                //hang on we don't have an answer yet
                return deferred.promise;

      }

    }
    
  }]);
