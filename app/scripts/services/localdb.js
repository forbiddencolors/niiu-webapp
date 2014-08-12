'use strict';

angular.module('niiuWebappApp')
  .factory('localDB',  function ( constants, $rootScope, $q) {
    
    // Service logic (these variables are available in the methods below)


      var default_table_name =  'niiu_user_db';
      var default_schema =  { stores:[{ name:'niiu_user', keyPath:"user" },{name:'last_3s_sync',keyPath:'sync_id'},{name:'article',keyPath:'id'}, {name:'sections',keyPath:'id'}, {name:'sources',keyPath:'id'}, {name:'subSections',keyPath:'id'}, {name:'sourceSubsections',keyPath:'id'},  {name:'sourceSections',keyPath:'id'}, {name:'sectionSubsections',keyPath:'id'}, {name:'full3s',keyPath:'contents.api'}] };  
      //add additional indexes {name:'sectionSubsections',keyPath:'id',indexes:[{keyPath: "section_id"},{keyPath:"subsection_id"}]}]


      var sync_table_name = 'last_3s_sync';
      //var sync_table_schema =  { stores:[{ name:sync_table_name, keyPath:"sync_id" }] }; 
      var syncAge = getCurrentTime();



      function connectDB(new_table_name, new_schema) {

        var table_name =  new_table_name || default_table_name;
        var schema = new_schema || default_schema; 

          console.log('we were trying to access the '+table_name);

          var local_table = new ydn.db.Storage(table_name, schema);

          return local_table;

        }


        function getCurrentTime() {

          var nowDate = new Date();


          var curr_year = nowDate.getFullYear();
          var curr_month = ( '0'+(nowDate.getMonth()+1) ).slice(-2);  //adds a 0 then tkes the last 2 chars leaving a 2 digit month add one because month count starts at 0
          var curr_date = ( '0'+nowDate.getDate() ).slice(-2) ; //adds a 0 then tkes the last 2 chars leaving a 2 digit date
          var curr_hours = ( '0'+nowDate.getHours() ).slice(-2);
          var curr_mins = ( '0'+ nowDate.getMinutes() ).slice(-2);
          var curr_secs = ( '0'+ nowDate.getSeconds() ).slice(-2);

          var curr_sync_time = curr_year+"-"+curr_month+"-"+curr_date+" "+curr_hours+":"+curr_mins+":"+curr_secs; 

          return curr_sync_time;

        }

        function getLast3sSync() {

          var default_time='0000-00-00 00:00:00';

          console.log('looking for the last sync time');
          //create or open the 3s table in the default db
          var local_table = connectDB();
          console.log('at least we got the table ',local_table);

          var deferred = $q.defer();
          //since we are only going to keep one users data here in the db at a time I think I will
          //continue using the same integer to refer to the record with the last sync time

          
           local_table.get("full3s","3s").done(
              function(pulled_3s) {
                if(pulled_3s===undefined) {
                  deferred.reject(default_time);
                  console.log('we couldnt pull the 3s from the db',pulled_3s);
                } else {
                    var last_sync_time =pulled_3s.contents.data.last3SSync;

                    console.log('last sync time from the 3s table',last_sync_time);
                    //console.log('We got the full3s object from the db', pulled_3s);

                    deferred.resolve(last_sync_time);
                    }
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt get the full3s object from the db because', failed_stuff);
                deferred.reject(default_time);
              }
              );

          return deferred.promise;



        }


        function getLastContentTime() {
          /*
          var default_time='0000-00-00 00:00:00';

          console.log('looking for the last sync time');
          //create or open the 3s table in the default db
          var local_table = connectDB();
          console.log('at least we got the table ',local_table);

          var deferred = $q.defer();
          //since we are only going to keep one users data here in the db at a time I think I will
          //continue using the same integer to refer to the record with the last sync time

          
           local_table.get("full3s","3s").done(
              function(pulled_3s) {
                var last_sync_time =pulled_3s.contents.data.lastContentSync;

                console.log('last Content Sync time from the 3s table',last_sync_time);
                //console.log('We got the full3s object from the db', pulled_3s);
                


                deferred.resolve(last_sync_time);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt get the full3s object from the db because', failed_stuff);
                deferred.reject(default_time);
              }
              );

          return deferred.promise;
          */

          //this LastContentSync is not always available.

        }

    
    
    // Public API here
    return {
      init: function(new_table_name, new_schema) {

          var new_db_connection = connectDB(new_table_name, new_schema);

          return new_db_connection;

        },

        getSyncAge: function() {
          var now = getCurrentTime();
          var lastSync = '';
          return syncAge;





        },

        getNowTime: function() {
          var now = getCurrentTime();
          return now;

        },


        getLastUser: function() {


          console.log('looking for the last user');
          var local_table = connectDB();
          console.log('at least we got the table ',local_table);

          var deferred = $q.defer();
          local_table.get(constants.USER_TABLE_NAME ,constants.USER_LOCATOR).done(function(last_user) {
              
              console.log('in the table the last user was ', last_user);

              //console.log('just checking that we can get the user from db');

              //niiuAuthenticator.changeUser(last_user.userInfo);
              
              if (typeof last_user == "undefined") {
                
                console.log('thats right nooone in the DB');
               deferred.reject('nobody in the DB');
              } else {
               //return last_user.userInfo;
                deferred.resolve(last_user.userInfo);
             }



            }).fail(function(e) {
              console.log('nobody found in the DB')
              
              deferred.reject(e);
            });

           return deferred.promise;

        },


        getLastSync: function() {
          var last3sTime = getLast3sSync();
          return last3sTime;

          },
          getLast3sSync: function() {
          var last3sTime = getLast3sSync();
          return last3sTime;

          },
          getLastContentSync: function() {
            var lastContentTime = getLastContentTime();
            return lastContentTime;

          },

        

        setLastSync: function(sync_time) {


          var current_time=sync_time || getCurrentTime();
          
          console.log(current_time);

          

        

          console.log('setting the last sync time');
          //create or open the 3s table in the default db
          var local_table = connectDB();
          console.log('at least we got the sync table ',local_table);

          var deferred = $q.defer();

          var last_sync_object = {sync_id:constants.USER_LOCATOR, last_sync_time:current_time};
          
          //put a new record with the current time into the db
          local_table.put(sync_table_name ,last_sync_object).done(function(last_sync_record) {
              
              console.log('we just set the current sync time ', last_sync_record);

              //console.log('just checking that we can get the user from db');

              
              
              deferred.resolve(last_sync_record);


            }).fail(function(e) {
              console.log('hmm couldnt save the current sync time')
              
              deferred.reject(e);
            });

           return deferred.promise;

           

          },


          getLastProfileUpdate:  function() {
            //we will change this in the db if there has been a setting change
            var default_time='2012-12-12 12:12:12';

            //we could just refer the default time here without a promise, but in case we get it from the db the promise makes sense.
            //return default_time;


            var deferred = $q.defer();

            deferred.resolve(default_time);

            return deferred.promise;


          },


/*
.done(function(localUser) {
              console.log('just checking that we can get the user from db');
              console.log(localUser);
              niiuAuthenticator.changeUser(localUser.userInfo);


             //console.log(constants);

            }).fail(function(e) {
              console.log('nobody in the DB')
              throw e;
            });



          console.log('the last user was ', last_user);

          return last_user;
  */

        


        deleteLocalUser: function() {

          var deferred = $q.defer();

          var local_table = connectDB();

          console.log('getting ready to remove the user from ');
          console.log(local_table);


          //local_table.remove(default_table_name, constants.USER_LOCATOR);
          //local_table.remove(constants.USER_LOCATOR);
          local_table.clear().done(function(cleared_rows) {
            console.log('db now cleared')
            deferred.resolve(cleared_rows);
          } );

          console.log(local_table);

          return deferred.promise;

        },

        addArticlesToDB: function(article_array) {

          var deferred = $q.defer();

          var local_table = connectDB();

          console.log('getting ready to add articles to DB ', article_array);
          local_table.clear('article').done(function(cleared_articles) {
            local_table.count('article').done(function(article_count) {
                console.log('we start with this many articles in the db ',article_count);
              
              local_table.put('article',article_array).done(
                  function(entered_stuff) {
                    console.log('We entered articles into the db', entered_stuff);

                  local_table.count('article').done(function(article_count) {
                    console.log('now we have this many articles in the db ',article_count);
                  });

                    deferred.resolve(entered_stuff);
                  }
                ).fail(
                  function(failed_stuff) {
                    console.log('We couldnt enter some articles into the db because', failed_stuff);
                    deferred.reject(failed_stuff);
                  }
                  );

            }); //pre addition article count

          }); //pre addition article clear


          return deferred.promise;

        },

        addSourceSectionsToDB: function(source_sections)   {
         
          console.log('these are the sourcesections we are trying to save',source_sections);
          var deferred = $q.defer();

          var local_table = connectDB();
          //local_table.clear('sourceSections');

          local_table.put('sourceSections',source_sections).done(
              function(entered_sourceSections) {
                console.log('We entered the sourceSections object into the db', entered_sourceSections);
                deferred.resolve(entered_sourceSections);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter sourceSections object into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );
            return deferred.promise;
          },
        addSubSectionsToDB: function(sub_sections)   {
         
          console.log('these are the subsections we are trying to save',sub_sections);
          var deferred = $q.defer();

          var local_table = connectDB();
          //local_table.clear('sourceSections');

          local_table.put('subSections',sub_sections).done(
              function(entered_subSections) {
                console.log('We entered the subSections object into the db', entered_subSections);
                deferred.resolve(entered_subSections);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter the subSections object into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );
            return deferred.promise;
          },
        addSectionSubsectionsToDB: function(section_subsections)   {
         
          console.log('these are the section_subsections we are trying to save',section_subsections);
          var deferred = $q.defer();

          var local_table = connectDB();
          //local_table.clear('sourceSections');

          local_table.put('sectionSubsections',section_subsections).done(
              function(entered_sourceSections) {
                console.log('We entered the section_subsections object into the db', section_subsections);
                deferred.resolve(section_subsections);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter section_subsections object into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );
            return deferred.promise;
          },
        addSourceSubsectionsToDB: function(source_subsections)   {
         
          console.log('these are the source_subsections we are trying to save',source_subsections);
          var deferred = $q.defer();

          var local_table = connectDB();
          //local_table.clear('sourceSections');

          local_table.put('sourceSubsections',source_subsections).done(
              function(entered_sourceSubsections) {
                console.log('We entered the source_subsections object into the db', entered_sourceSubsections);
                deferred.resolve(entered_sourceSubsections);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter source_subsections object into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );
            return deferred.promise;
          },

        loadSourceSubsectionsFromDB: function() {
            var deferred = $q.defer();
            var local_table = connectDB();
            local_table.values('sourceSubsections').done(function(data) {
              console.log('here are all the SourceSubsections from the DB',data);
              
              deferred.resolve(data);

            });

          return deferred.promise;


        },

        loadArticlesFromDB: function() {
            var deferred = $q.defer();
            var local_table = connectDB();
            console.log('getting db articles');
            local_table.values('article').done(function(data) {
              console.log('here are all the articles from the DB',data);
              
              deferred.resolve(data);

            });

          return deferred.promise;


        },

        loadSectionSubsectionsFromDB: function() {
            var deferred = $q.defer();
            var local_table = connectDB();
            local_table.values('sectionSubsections').done(function(data) {
              console.log('here are all the section_subsections from the DB',data);
              
              deferred.resolve(data);

            });

          return deferred.promise;


        },

        loadSectionsFromDB: function() {

            var deferred = $q.defer();

            var local_table = connectDB();

            local_table.values('sections').done(function(data) {
              console.log('here are all the sections from the DB',data);
              
             
              deferred.resolve(data);

            })
            .fail(function(section_error) {
              console.log('failed to get sections because ',section_error);

            });

            
            return deferred.promise;
          


        },

        loadSubSectionsFromDB: function() {

            var deferred = $q.defer();

            var local_table = connectDB();

            local_table.values('subSections').done(function(data) {
              console.log('here are all the subsections from the DB',data);
              
             
              deferred.resolve(data);

            })
            .fail(function(section_error) {
              console.log('failed to get sections because ',section_error);

            });

            
            return deferred.promise;
          


        },

        loadSourcesFromDB: function() {

            var deferred = $q.defer();

            var local_table = connectDB();

            local_table.values('sources').done(function(data) {
              console.log('here are all the sources from the DB',data);
              
             
              deferred.resolve(data);

            })
            .fail(function(source_error) {
              console.log('failed to get sources because ',source_error);

            });

            
            return deferred.promise;
          


        },

        loadSourceSectionsFromDB: function() {

            var deferred = $q.defer();

            var local_table = connectDB();

            local_table.values('sourceSections').done(function(data) {
              console.log('here are all the sourceSections from the DB',data);
              
             
              deferred.resolve(data);

            })
            .fail(function(source_error) {
              console.log('failed to get sourceSections because ',source_error);

            });

            
            return deferred.promise;
          


        },

        loadSourceSubSectionsFromDB: function() {

            var deferred = $q.defer();

            var local_table = connectDB();

            local_table.values('sourceSubSections').done(function(data) {
              console.log('here are all the sourceSubSections from the DB',data);
              
             
              deferred.resolve(data);

            })
            .fail(function(source_error) {
              console.log('failed to get sourceSubSections because ',source_error);

            });

            
            return deferred.promise;
          


        },

        get3sFromDB: function() {

           var deferred = $q.defer();
           console.log('getting the whole 3s from db')
          var local_table = connectDB();

          local_table.get("full3s","3s").done(
              function(pulled_3s) {
                if (pulled_3s===undefined) {
                  deferred.reject(pulled_3s);
                  console.log('the full 3s was empty',pulled_3s);
                } else {
                console.log('We got the full3s object from the db', pulled_3s);
                deferred.resolve(pulled_3s);
              }
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt get the full3s object from the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );

          return deferred.promise;

        },





        put3s: function(data_3s) {

           var deferred = $q.defer();
           console.log('save the whole 3s', data_3s)
          var local_table = connectDB();

          local_table.put('full3s',data_3s).done(
              function(entered_3s) {
                console.log('We entered the full3s object into the db', entered_3s);
                deferred.resolve(entered_3s);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter full3s object into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );
            return deferred.promise;
            /*

            local_table.add('sectionSubsections',data_3s.newSectionSubsection).done(
              function(entered_SectionSubsection) {
                console.log('We entered sectionSubsections object into the db', entered_SectionSubsection);
                deferred.resolve(entered_SectionSubsection);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter sectionSubsection object into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );

            local_table.add('sourceSubsections',data_3s.newSourceSubsection).done(
              function(entered_SourceSubsection) {
                console.log('We entered sourceSubsections object into the db', entered_SourceSubsection);
                deferred.resolve(entered_SourceSubsection);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter sourceSubsection object into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );



          console.log('getting ready to put Subsections object into DB ', data_3s.newSubsections);
          local_table.add('subSections',data_3s.newSubsections).done(
              function(entered_newSubsections) {
                console.log('We entered Subsections object into the db', entered_newSubsections);
                deferred.resolve(entered_newSubsections);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter Subsections object into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );
*/
/*
            console.log('getting ready to add sources to DB ', sources_array);
          local_table.add('sources',sources_array).done(
              function(entered_stuff) {
                console.log('We entered sources into the db', entered_stuff);
                deferred.resolve(entered_stuff);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter any sources into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );

          console.log('getting ready to add sections to DB ', section_array);
          local_table.add('sections',section_array).done(
              function(entered_stuff) {
                console.log('We entered sections into the db', entered_stuff);
                deferred.resolve(entered_stuff);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter any sections into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );
  

          return deferred.promise;
  */
        },

        addSourcesToDB: function(sources_array) {

          var deferred = $q.defer();

          var local_table = connectDB();

          console.log('getting ready to add sources to DB ', sources_array);
          local_table.put('sources',sources_array).done(
              function(entered_stuff) {
                console.log('We entered sources into the db', entered_stuff);
                deferred.resolve(entered_stuff);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter any sources into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );

          return deferred.promise;

        },

        addSectionsToDB: function(section_array) {

          var deferred = $q.defer();

          var local_table = connectDB();

          console.log('getting ready to add sections to DB ', section_array);
          local_table.put('sections',section_array).done(
              function(entered_stuff) {
                console.log('We entered sections into the db', entered_stuff);
                deferred.resolve(entered_stuff);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter any sections into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );

          return deferred.promise;

        },

        storeUser: function(userData) {

          var new_db_connection = connectDB();
          
          console.log('we just got new data that looks like',userData);
          console.log('we want to put it into the db');

          //set up a promise
          var deferred = $q.defer();
          
          //console.log(niiu_user_obj.id);

          // ["id", "firstName", "lastName", "eMail", "birthDate", "fbID", "fbAccessToken", "gender", "apiKey", "lastUpdated", "contentProfile", "subscription", "newRegistration"] 
          //db.put(array('id','firstName','lastName','eMail','fbID','fbAccessToken','apiKey','lastUpdated','contentProfile','subscription','newRegistration'), 
          //        array(niiu_user_obj.id,niiu_user_obj.firstName,niiu_user_obj.lastName,niiu_user_obj.eMail,niiu_user_obj.fbID,niiu_user_obj.fbAccessToken,niiu_user_obj.apiKey,niiu_user_obj.lastUpdated,niiu_user_obj.contentProfile,niiu_user_obj.subscription,niiu_user_obj.newRegistration));
          
         // db2.put('store-name', {message: 'Hello world!'}, 'id1');


         // $rootScope.db.put({name:'niiu_user', keyPath:'user'}, {user: 10210, userInfo: niiu_user_obj});

           var niiu_user_obj=userData;
           if (userData === null) {
            deferred.reject('no currentUser');

           } else {
               new_db_connection.put(constants.USER_TABLE_NAME, {user: constants.USER_LOCATOR, userInfo: niiu_user_obj})
               .done(function(result) {

                    console.log('just stored this user ',userData, 'in this table');
                    deferred.resolve(result);

                })
               .fail(function(reason) {
                    console.log('we couldnt save the user to the db because ',reason);
                    deferred.reject(reason);
               });

               $rootScope.user=niiu_user_obj;
               return deferred.promise;
            }


        }



      
    };  
  });


