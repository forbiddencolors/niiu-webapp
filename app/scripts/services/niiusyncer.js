'use strict';

angular.module('niiuWebappApp')
  .factory('niiuSyncer',['$rootScope', '$http', '$q', '$filter', 'constants','localDB', 'User',  function ($rootScope, $http, $q, $filter, constants, localDB, User) {
    // Service logic
    // ...

    // Tobias: 
    //v ar currentUser = User.getUser();
    var currentUser = $rootScope.user;
    var last3SSync = {};
    var menuObj = {};
    var sourceObj = {};
    var SubsectionObj = {};
    var SourceSubsectionObj = {};


    var deferred = $q.defer();



    var last_sync_time=localDB.getLastSync().then(function(sync_time) {
      console.log('the last sync time in the db is',sync_time);
      return sync_time;
    },
    function(sync_error) {
      console.log('unfortunately we couldnt find a sync time in the db',sync_error);
      return "0000-00-00 00:00:00";
    }

    );




    var dontUseArticleData = {
      "api": "content",
      "action": "get",
      "appGuid": constants.NIIU_APP_GUID,
      "apiKey": currentUser.apiKey,
      "data": {
          "last3SSync": last_sync_time,
          "lastContentSync": last_sync_time,
          "user_id": currentUser.contentProfile.userID,
         "version": 200.7,
         "article_ids": [ ],
         "contentProfile": {
             "id": currentUser.id,
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

    function createArticleObject(current_user,last_sync_time, last_cp_update_time) {


              var articleData = {
                "api": "content",
                "action": "get_articles_from_solr",
                "appGuid": constants.NIIU_APP_GUID,
                "data": {
                    "last3SSync": last_sync_time,
                    "lastContentSync": last_sync_time,
                    "user_id": currentUser.id,
                   "version": 200.7,
                   "article_ids": [ ],
                   "contentProfile": {
                       "id": currentUser.contentProfile.id,
                       "localID": 2,
                       "isPublic": 1,
                       "name": "Default Content Profile",
                       "subscribedTo": null,
                      "lastUpdated": last_cp_update_time,
                      "items": [  ]
                  },
                  "forceSync": true
                }
              };


            return articleData;
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




          
        /*
        a functioning object looks like this
        {
      "api": "content",
      "action": "get",
      "appGuid": "3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c",
      "apiKey": "7c087be0fc4e6929c0e6a28183ec0dcf8105053f",
      "data": {
          "last3SSync": "2014-05-21 08:17:50",
          "lastContentSync": "2014-05-21 08:13:37",
          "user_id": "1014",
         "version": 102.5,
         "article_ids": [
             {
                 "id": 354821
             },
             {
                 "id": 354959
             }
         ],
         "contentProfile": {
             "id": 1627,
             "localID": 2,
             "isPublic": 1,
             "name": "Default Content Profile",
             "subscribedTo": null,
            "lastUpdated": "2014-05-21 08:13:26",
            "items": [
                {
                    "section": null,
                    "source": null,
                    "subsection": null,
                    "custom_section": "Bayern München" 
                },
                {
                    "section": 7,
                    "source": 30,
                    "subsection": null,
                    "custom_section": null
                },
                {
                    "section": 7,
                    "source": 9,
                    "subsection": null,
                    "custom_section": null
                }
            ]
        },
        "forceSync": true
    }
}




*/
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


/*
                        //add subsectionsbysources to the menuObj
                        angular.forEach(data_3s.contents.data.newSourceSubsection, function(SourceSubMap, key) {
                          //sourceObj.["source_"+SourceSubMap.source_id].subsections["sub_"+SourceSubMap.subsection_id]=SubsectionObj["sub_"+subsection_id];
                          //sec_src.section_id = subs.section_id





                          console.log('dealing with this subssection',(SourceSubMap.subsection_id===SubsectionObj["sub_"+SourceSubMap.subsection_id].id));
                          if (sourceSecMap.source_id===SourceSubMap.source_id  ) {
                            //&& sourceSecMap.section_id===SubsectionObj["sub_"+SourceSubMap.subsection_id].section_id
                              //&& SourceSubMap.subsection_id===SubsectionObj.id
                              //sub.id = sub_src.subsection_id

                            console.log("adding this subsection",SubsectionObj["sub_"+SourceSubMap.subsection_id].source_subsection_id);
                            //this["sec_"+sourceSecMap.section_id].sources["source_"+SourceSubMap.source_id].subsections ={};
                            //remove the source_section_id from the parent so people can olnly add subsections of this source
                            this["sec_"+sourceSecMap.section_id].sources["source_"+SourceSubMap.source_id].source_section_id=null;
                            SubsectionObj["sub_"+SourceSubMap.id].source_subsection_id=SourceSubMap.id;
                            //console.log('enough already menuObj', SubsectionObj["sub_"+SourceSubMap.subsection_id]);
                            this["sec_"+sourceSecMap.section_id].sources["source_"+SourceSubMap.source_id].subsections["sub_"+SourceSubMap.subsection_id]=SubsectionObj["sub_"+SourceSubMap.id];


                              angular.forEach(data_3s.contents.data.newSectionSubsection, function(SectionSubMap, key) {
                                 //console.log('what I got',SubsectionObj["sub_"+SectionSubMap.subsection_id])
                                 console.log('not happening', SubsectionObj["sub_"+SectionSubMap.subsection_id].id);
                                if(sourceSecMap.section_id === SectionSubMap.section_id) {
                                //if(sourceSecMap.section_id === SubsectionObj["sub_"+SectionSubMap.subsection_id].section_id) {
                                  console.log('its happening');
                                  //console.log('does this subsection menuObj exist?',SubsectionObj["sub_"+SectionSubMap.subsection_id]);
                                  SubsectionObj["sub_"+SectionSubMap.id]=SubsectionObj["sub_"+SectionSubMap.subsection_id];
                                  SubsectionObj["sub_"+SectionSubMap.id].section_subsection_id=SectionSubMap.id;
                                  SubsectionObj["sub_"+SectionSubMap.id].section_id=SectionSubMap.section_id;
                                  //console.log('menuObject sectionSub',SubsectionObj["sub_"+SectionSubMap.id]);
                                  
                                 this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections["sub_"+SectionSubMap.id]=SubsectionObj["sub_"+SectionSubMap.id];
                                 console.log('whats this menuObj', SubsectionObj["sub_"+SectionSubMap.id]);
                               }

                               }, menuObj);
                              



                            
                         }

                        }, menuObj);

*/

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
                          if (!this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections) {
                              this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections={};
                            }
                            //this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections["sub_"+SourceSubMap.subsection_id]=SubsectionObj["sub_"+SourceSubMap.subsection_id];
                            this["sec_"+SectionSubMap.section_id].sources["source_"+SourceSubMap.source_id].subsections["sub_"+SourceSubMap.subsection_id]=SubsectionObj["sub_"+SourceSubMap.subsection_id];
                          }


                        }, menuObj);

                }, menuObj);

              }, menuObj);








/*
          //add subsections to the menuObj
          angular.forEach(data_3s.contents.data.newSectionSubsection, function(SectionSubMap, key) {
              //console.log('does this subsection menuObj exist?',SubsectionObj["sub_"+SectionSubMap.subsection_id]);
              SubsectionObj["sub_"+SectionSubMap.subsection_id].section_subsection_id=SectionSubMap.id;
             this["sec_"+SectionSubMap.section_id].subsections["sub_"+SectionSubMap.subsection_id]=SubsectionObj["sub_"+SectionSubMap.subsection_id];
              this["sec_"+SectionSubMap.section_id].subsections["sub_"+SectionSubMap.subsection_id].sources=[];

                //add sourcesbysubsections to the menuObj
                angular.forEach(data_3s.contents.data.newSourceSubsection, function(SourceSubMap, key) {
                  if (SectionSubMap.subsection_id===SourceSubMap.subsection_id) {
                      //hope this doesn't change the real sourceObj
                      sourceObj["source_"+SourceSubMap.source_id].source_subsection_id=SourceSubMap.id;
                     this["sec_"+SectionSubMap.section_id].subsections["sub_"+SourceSubMap.subsection_id].sources.push(sourceObj["source_"+SourceSubMap.source_id]);
                     //this[sectionId].subsections[subsection_id].sources.push(sourceObj[SourceSubMap.source_id]);
                  }  
               }, menuObj);


           }, menuObj);
*/


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

        //create a promise
        var deferred = $q.defer();

        $http.post(constants.NIIU_API_URL+"articles/get_articles_from_solr", "data="+angular.toJson(articleData), {
                    
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

        var threeSRequest = create3sObject();

        threeSRequest.then(function(threeSJSON) {

        //threeSRequest
            console.log('weve got the 3s json', threeSJSON);

              deferred.notify('asking the api');
              $http.post(constants.NIIU_API_URL+"articles/sync_3s", "data="+angular.toJson(threeSJSON), {
                              
                          }).then(function(threeSResponse){
                              console.log('heres the response from the niiu api', threeSResponse)
                              
                              if (threeSResponse.status==200) {

                                  console.log('The 3s response was good')

                              
                              deferred.resolve(threeSResponse);
                              
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
