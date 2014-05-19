'use strict';

angular.module('niiuWebappApp')
  .factory('localDB',  function ( constants, $rootScope, $q) {
    
    // Service logic (these variables are available in the methods below)


      var default_table_name =  'niiu_user_table';
      var default_schema =  { stores:[{ name:'niiu_user', keyPath:"user" }] }; 

      function connectDB(new_table_name, new_schema) {

        var table_name =  new_table_name || default_table_name;
        var schema = new_schema || default_schema; 

          console.log('we were trying to access the '+table_name);

          var local_table = new ydn.db.Storage(table_name, schema);

          return local_table;

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


