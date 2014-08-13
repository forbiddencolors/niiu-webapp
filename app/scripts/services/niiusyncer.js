'use strict';

angular.module('niiuWebappApp')
  .factory('niiuSyncer',['$rootScope', '$http', '$q', '$filter', 'constants','localDB', 'User',  function ($rootScope, $http, $q, $filter, constants, localDB, User) {
    // Service logic
    // ...

    // Tobias: 
    var currentUser = User.getUser();
    //var currentUser = $rootScope.user;
    var last3SSync = {};
    var menuObj = {};
    var sourceObj = {};
    var SubsectionObj = {};
    var SourceSubsectionObj = {};


    var deferred = $q.defer();



    var last_sync_time=localDB.getLastSync().then(function(sync_time) {
      console.log('the last 3s sync time in the db is',sync_time);
      return sync_time;
    },
    function(sync_error) {
      console.log('unfortunately we couldnt find a 3s sync time in the db',sync_error);
      return "0000-00-00 00:00:00";
    }

    );



    function createArticleObject(current_user,last_sync_time, last_cp_update_time, section_array, article_array) {

        article_array = article_array || [];
        section_array = section_array || [];
              var articleData = {
                "api": "content",
                "action": "get_articles_from_solr",
                "appGuid": constants.NIIU_APP_GUID,
                "data": {
                    "last3SSync": last_sync_time,
                    "lastContentSync": last_sync_time,
                    "user_id": current_user.id,
                   "version": 200.7,
                   "article_ids": [ ],
                   "contentProfile": {
                       "id": current_user.contentProfile.id,
                       "localID": 2,
                       "isPublic": 1,
                       "name": "Default Content Profile",
                       "subscribedTo": null,
                      "lastUpdated": last_cp_update_time,
                      "items": section_array
                  },
                  "forceSync": true
                }
              };
              console.log('Creating article object', articleData);

            return articleData;
      }
    
        function sendSyncObject(syncObject) {

//create a promise
        var deferred = $q.defer();

        $http.post(constants.NIIU_API_URL+"articles/get_articles_from_solr", "data="+angular.toJson(syncObject), {
                    
                }).success(function(articleResponse){
                    console.log('heres the response from the niiu api', articleResponse);
                    
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

        }

        function create3sObject() {

              var deferred = $q.defer();

              var last_sync_time=localDB.getLastSync().then(function(sync_time) {
                console.log('the last sync time in the db is',sync_time);
                return sync_time;
              },

              function(sync_error) {
                console.log('unfortunately we couldnt find a sync time in the db',sync_error);
                return "0000-00-00 00:00:00";
              });



              var threeSData = {};
              last_sync_time.then(function(sync_time) {
                  console.log('we just got the sync time so now we can use the data to make the request', sync_time);

                  var threeSData = {
                                      "api": "3s",
                                      "action": "sync",
                                      "appGuid": constants.NIIU_APP_GUID,
                                      "data": {
                                          "lastSync": sync_time,
                                          "sections": [

                                          ],
                                          "sources": [

                                          ],
                                           "subsections": [

                                          ],
                                          "sections_subsections": [

                                          ],
                                           "sources_sections": [

                                          ],
                                          "sources_subsections": [

                                          ]
                                      }
                                  };  

              deferred.resolve(threeSData);
              }

          );

       

          return deferred.promise;
      }



    // Public API here
    return {
      syncProfile: function () {
        
      },

      createArticleObjectPass: function(guid,apiKey,last_sync_time,userID,profileID) {

          var articleData = {
                  "api": "content",
                  "action": "get_articles_from_solr",
                  "appGuid": guid,
                  "data": {
                      "last3SSync": last_sync_time,
                      "lastContentSync": last_sync_time,
                      "user_id": userID,
                     "version": constants.NIIU_API_VERSION,
                     "article_ids": [ ],
                     "contentProfile": {
                         "id": profileID,
                         "localID": 2,
                         "isPublic": 1,
                         "name": "Default Content Profile",
                         "subscribedTo": null,
                        "lastUpdated": last_sync_time,
                        "items": [  ]
                    },
                    "forceSync": true
                  }
            };
            return articleData;
      },


      getSharedArticle: function(article_id) {

            var deferred= $q.defer();

            var guestArticleObject = {
                  "action": "get_article",
                 "api": "content",
                 "apiKey": constants.GUEST_API_KEY,
                 "appGuid": constants.NIIU_APP_GUID,
                 "data": {
                     "articleIDs": [
                         article_id
                     ],
                    "userID": constants.GUEST_ID
                  }
            }


                 $http.post(constants.NIIU_API_URL+"articles/get_article", "data="+angular.toJson(guestArticleObject), {
                        
                    }).success(function(guestResponse){
                        console.log('heres the guest article response from the niiu api', guestResponse);
                        
                        if (guestResponse.contents.status==200) {

                            console.log('The guest article response was good', guestResponse);

                          deferred.resolve(guestResponse);
                        
                        } else {
                                
                                console.log('The guest article response wasnt so good...', guestResponse);
                                
                                deferred.reject(guestResponse);
                        }

                    }).error(function(guestArticleError){
                        console.log('this was a guest article error',guestArticleError);
                        deferred.reject(guestArticleError);
                     });
                    //hang on we don't have an answer yet
                    return deferred.promise;

                
            },



      createSectionObject: function(current_user,last_sync_time, last_cp_update_time, section_array) {
          
          console.log('we need to set the following sections for the user',section_array);
          
          var articleObj=createArticleObject(current_user,last_sync_time, last_cp_update_time, section_array);

          return articleObj;

         


      },

      syncNewSections: function(sectionObj) {
        var syncPromise= sendSyncObject(sectionObj);

         return syncPromise;

      },

      createMenuObj: function(){
        //set a promise so we wait for the db on the other end.
        var deferred=$q.defer();
        localDB.get3sFromDB().then(function(data_3s) {
          
          //create an array of sources by id
          angular.forEach(data_3s.contents.data.newSources, function(sourceObj, key) {
                //sourceObj.subsections={};
                this["source_"+sourceObj.id]=sourceObj;

          }, sourceObj);

          //create an array of subsections by id
          angular.forEach(data_3s.contents.data.newSubsections, function(subsectionObj, key) {
             this["sub_"+subsectionObj.id ]= subsectionObj;
             console.log('these are the subsections',subsectionObj);
           }, SubsectionObj);




          //create an array of sections by id
          angular.forEach(data_3s.contents.data.newSections, function(sectionObj, key) {

               sectionObj.sources = {};
               
               this["sec_"+sectionObj.id]=sectionObj;
               //this[].time = new Date().getTime()+Math.random() * (900000 - 100000) + 100000;

               
               //console.log('menuObj--',this[sectionObj.id ].id);
              
           }, menuObj);



          //add sourcebysections to the menuObj
          angular.forEach(data_3s.contents.data.newSourceSection, function(sourceSecMap, key) {
             // sourceObj["source_"+sourceSecMap.source_id].source_section_id=sourceSecMap.id;
             // var sectionNode = $filter('getByProperty')(this, 'id', sourceSecMap.section_id);
              // sectionNode.sources.push(sourceObj[sourceSecMap.source_id]);

              //clone the sourceObj so we don't mess it up
              var clonedSourceObject=JSON.parse(JSON.stringify(sourceObj["source_"+sourceSecMap.source_id]))

              //console.log('too late',  sourceObj["source_"+sourceSecMap.source_id]);
              this["sec_"+sourceSecMap.section_id].sources["source_"+sourceSecMap.source_id] = clonedSourceObject;

           }, menuObj);


            angular.forEach(menuObj, function(menuSection, key) {
                //which sections do these subsections go to
                angular.forEach(data_3s.contents.data.newSectionSubsection, function(SectionSubMap, key) {
                  var currentSection = SectionSubMap.section_id;  
                  var currentSubsection = SectionSubMap.subsection_id;



                        angular.forEach(data_3s.contents.data.newSourceSubsection, function(SourceSubMap, key) {


                            //   angular.forEach(data_3s.contents.data.newSourceSection, function(sourceSecMap, key) {

                         // SourceSubMap.source_id;
                         // SourceSubMap.subsection_id
                         //console.log('do we have a ',menuSection.sources["source_"+SourceSubMap.source_id]);

                          if (menuSection.sources["source_"+SourceSubMap.source_id]
                            && SectionSubMap.subsection_id === SourceSubMap.subsection_id 
                            && SubsectionObj["sub_"+SourceSubMap.subsection_id].active===true
                           // && SectionSubMap.section_id === menuSection.id
                          //  && SourceSubMap.source_id === menuSection.sources["source_"+SourceSubMap.source_id].id 

                            ) {
                            console.log('time to do something with '+"sec_"+SectionSubMap.section_id+", source_"+SourceSubMap.source_id+", "+"sub_"+SourceSubMap.subsection_id);
                          console.log('what is this typeof anyway',(typeof(this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id])=='undefined'));
                          if (typeof(this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id])=='undefined') {
                              //this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id]={};
                              this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id]={};
                            }
                          if (typeof(this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections)=='undefined') {
                              //this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id]={};
                              this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections={};
                            }

                            //this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections["sub_"+SourceSubMap.subsection_id]=SubsectionObj["sub_"+SourceSubMap.subsection_id];
                            this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections["sub_"+SourceSubMap.subsection_id]=SubsectionObj["sub_"+SourceSubMap.subsection_id];
                          }


                        }, menuObj);

                }, menuObj);

              }, menuObj);




          deferred.resolve(menuObj);


          

        },function(error_3s) {
          console.log('no 3s data for the menu',error_3s);
          deferred.reject(menuObj);

        }
        );

        return deferred.promise;




      },

      syncArticles: function(current_user,last_sync_time,last_cp_update_time) {

        //if we take the dependency of finding the sync time out of this it should be pretty instant and syncronous
        var articleData=createArticleObject(current_user, last_sync_time, last_cp_update_time);

        console.log('heres the article object we are sending', articleData);

        var syncPromise = sendSyncObject(articleData);

        return syncPromise;

      },


      sync3s: function() {

        console.log('we have to do a 3s sync');
        //create a promise
        var deferred = $q.defer();

        var threeSRequest = create3sObject();

        threeSRequest.then(function(threeSJSON) {

        //threeSRequest
            console.log('weve got the 3s json', threeSJSON);

              deferred.notify('asking the api');
              $http.post(constants.NIIU_API_URL+"articles/sync_3s", "data="+angular.toJson(threeSJSON), {
                              
                          }).then(function(threeSResponse){
                              console.log('heres the response from the niiu api', threeSResponse)
                              
                              if (threeSResponse.status==200) {

                                  console.log('The 3s response was good. new sync time is ', threeSResponse.data.contents.data.last3SSync);


                                localDB.put3s(threeSResponse).then(function() {                             
                                  console.log('the new 3s sync info should be in the db now',threeSResponse)
                                  deferred.resolve(threeSResponse);

                                });
                              
                              } else {
                                      
                                      console.log('The 3s response wasnt so good...', threeSResponse);
                                      
                              deferred.reject(threeSResponse);
                              }

                          },function(error){
                              console.log('this was a straight up 3s error',error);
                              deferred.reject(error);
                           });
                          //hang on we don't have an answer yet
                          

                }


        );
        return deferred.promise;    
      }

    
  }}
  ]);
