'use strict';

angular.module('niiuWebappApp')
  .controller('CustomizeCtrl', function ($rootScope, $scope, niiuSyncer, localDB, $q, User) {


  	console.log('the scope at this point is like this', $scope);
  	console.log('the root scope at this point is like', $rootScope);




  	function getSections() {
      var deferred = $q.defer();


  		localDB.loadSectionsFromDB().then(function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			deferred.resolve(db_sections)
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error);
  			deferred.reject(db_error);
  		});
  			//this tells the next function to wait for the answer
  			return deferred.promise;

  			
  	};

  	  function getSources() {
        var deferred = $q.defer();

  		localDB.loadSourcesFromDB().then(function(db_sources) {
  			console.log('I got the following sources from the DB', db_sources);
  			deferred.resolve(db_sources)
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error);
  			deferred.reject(db_error);
  		});
  			//this tells the next function to wait for the answer
  			return deferred.promise;

  			
  	};

  	getSections().then(function(sections) {
  		$scope.sections = sections;
  		console.log('putting the section list into the scope of this page');

  	}

  	).then(function() {
  		console.log('chained response');

  		/*getSources().then(function(sources) {
  			$scope.sources=sources;
  			console.log('adding sources to scope',sources);

	}
  	);
*/

  		
  	});


  	getSources().then(function(sources) {
  			$scope.sources=sources;
  			console.log('add sources to scope',sources);
        //$scope.apply();
	}
  	);

  $scope.currentUser = User.getUser();






/*
  	var newSections = function() {

  		var deferred = $q.defer();
  		var promise = deferred.promise;

  		promise.then(function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			deferred.resolve(db_sections)
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error);
  			deferred.reject(db_error);
  		});
  		
  		//return promise;

  		var loadSections = localDB.loadSectionsFromDB();
  		loadSections.then( function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			deferred.resolve(db_sections)
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error);
  			deferred.reject(db_error);
  		}
  		
  		);	



  	};

  //	newSections();
  	//localDB.loadSectionsFromDB().then(function(loaded) {
  		console.log('loaded!!',localDB.loadSectionsFromDB());
  	//}
  	//);
  
  	

  	getSections().then(
  		function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			return db_sections;
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error)
  		}



  		);
*/
  	//console.log(getSections());





  });
