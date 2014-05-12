'use strict';

angular.module('niiuWebappApp')
  .factory('localDB', function (constants) {
    
    // Service logic


      var table_name =  table_name || 'niiu_user_table';
      var schema = schema || { stores:[{ name:'niiu_user', keyPath:"user" }] }; 

       
    
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
      init: function(table_name, schema) {

          

          var local_table = new ydn.db.Storage(table_name, schema);

          return local_table;

        },

        getLastUser: function() {


          var local_table = init();

          var last_user = local_table.get(constants.USER_LOCATOR);

          return last_user;

        }



      
    };  
  });


