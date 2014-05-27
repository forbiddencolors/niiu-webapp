'use strict';

angular.module('niiuWebappApp')
  .controller('CustomizeCtrl', function ($rootScope, $scope, niiuSyncer, localDB, $q) {


  	console.log('the scope at this point is like this', $scope);
  	console.log('the root scope at this point is like', $rootScope);

  	function getSections() {
  			//this says wait for an answer
  			var deferred = $q.defer();

  			//this gets the sections from the db
  			localDB.loadSectionsFromDB().then(
  				function(good_answer) {

  					console.log('I got the following sections from the DB', good_answer);
  					deferred.resolve(good_answer);

  				}

  			);


  			//this tells the next function to wait for the answer
  			return deferred.promise;
  	}

  	getSections().then(
  		function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			return db_sections;
  		}



  		)





  });
