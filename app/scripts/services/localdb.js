'use strict';

angular.module('niiuWebappApp')
  .factory('localDB',  function ( constants, $rootScope, $q) {
    
    // Service logic (these variables are available in the methods below)


      var default_table_name =  'niiu_user_table';
      var default_schema =  { stores:[{ name:'niiu_user', keyPath:"user" },{name:'last_3s_sync',keyPath:'sync_id'},{name:'article',keyPath:'id'}, {name:'sections',keyPath:'id'}] }; 
      var sync_table_name = 'last_3s_sync';
      //var sync_table_schema =  { stores:[{ name:sync_table_name, keyPath:"sync_id" }] }; 




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

       
    
    //return local_table;
      /*

      var localDB = {
        init: function(table_name, schema) {

          var table_name =  table_name || 'niiu_user_table';
          var schema = schema || { stores:[{ name:'niiu_user', keyPath:"user" }] }; 

          var local_table = new ydn.db.Storage(table_name, schema);

          return local_table;

        }

        getLastUser: function() {

          var table_name =  'niiu_user_table';
          var schema = { stores:[{ name:'niiu_user', keyPath:"user" }] }; 

          var local_table = new ydn.db.Storage(table_name, schema);

          var last_user = local_table.get(10210);

          return last_user;

        }

       


      }
       */
      

      //return localDB;
      

    //Here is where I should make some public methods, but because this is 
    //just a DB wrapper itself i think i will just deal with its native methods
    
    
    // Public API here
    return {
      init: function(new_table_name, new_schema) {

          var new_db_connection = connectDB(new_table_name, new_schema);

          return new_db_connection;

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
          var default_time='0000-00-00 00:00:00';

          console.log('looking for the last sync time');
          //create or open the 3s table in the default db
          var local_table = connectDB();
          console.log('at least we got the table ',local_table);

          var deferred = $q.defer();
          //since we are only going to keep one users data here in the db at a time I think I will
          //continue using the same integer to refer to the record with the last sync time
          local_table.get(sync_table_name ,constants.USER_LOCATOR).done(function(last_sync_record) {
              
              console.log('in the table the last user was ', last_sync_record);

              //console.log('just checking that we can get the user from db');

              //niiuAuthenticator.changeUser(last_user.userInfo);
              
              if (typeof last_sync_record == "undefined") {
                
                console.log('thats right no last sync time');
               deferred.reject(default_time);
              } else {
               //return last_user.userInfo;
               console.log('yes we do have a last sync time', last_sync_record);
                deferred.resolve(last_sync_record.last_sync_time);
             }



            }).fail(function(e) {
              console.log('error finding last sync',e)
              
              deferred.reject(default_time);
            });

            return deferred.promise;

          },

        

        setLastSync: function() {


          var current_time=getCurrentTime();
          
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

            deferred.resolve(cleared_rows);
          } );

          console.log(local_table);

          return deferred.promise;

        },

        addArticlesToDB: function(article_array) {

          var deferred = $q.defer();

          var local_table = connectDB();

          console.log('getting ready to add articles to DB ', article_array);
          local_table.add('article',article_array).done(
              function(entered_stuff) {
                console.log('We entered articles into the db', entered_stuff);
                deferred.resolve(entered_stuff);
              }
            ).fail(
              function(failed_stuff) {
                console.log('We couldnt enter soome articles into the db because', failed_stuff);
                deferred.reject(failed_stuff);
              }
              );

          return deferred.promise;

        },

        loadArticlesFromDB: function() {

            var local_table = connectDB();
            local_table.values('articles').done(function(data) {
              console.log('here are all the articles from the DB',data);
              
              return data;

            });

          


        },

        loadSectionsFromDB: function() {

            var deferred = $q.defer;

            var local_table = connectDB();
            local_table.values('sections').done(function(data) {
              console.log('here are all the sections from the DB',data);
              
              deferred.resolve(data);

            }).fail(function(failure) {
              console.log('failed at getting sections from the db', failure);
              deferred.reject(failure);
            });

            return deferred.promise;

          


        },

        addSectionsToDB: function(section_array) {

          var deferred = $q.defer();

          var local_table = connectDB();

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


